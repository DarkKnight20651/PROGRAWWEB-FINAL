<?php

namespace App\Http\Controllers;

use App\Mail\NuevoEstadoDocumentos;
use App\Models\Document;
use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'role' => 'string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|confirmed|string|min:8',
        ]);
        $path_imagen = null;

        if ($request->hasFile('path_imagen') && $request->file('path_imagen')->isValid()) {
            $path_imagen = $request->file('path_imagen')->store('usuarios', 'public');
        }
        $user = User::create([
            'role' => $validated["role"],
            'email' => $validated["email"],
            'path_imagen' => $path_imagen,
            'password' => Hash::make($validated["password"]),
        ]);

        return response()->json($user, 201);
    }

    public function show($id)
    {
        return User::with('Cliente')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'email' => ['required', 'email', 'unique:users,email,' . $user->id],
            'role' => 'string|max:255',
            'password' => [
                'nullable',
                'confirmed',
                Password::min(8)
            ],
        ]);
        if ($request->hasFile('path_imagen') && $request->file('path_imagen')->isValid()) {
            // Eliminar la imagen anterior si existe
            if ($user->path_imagen) {
                Storage::delete($user->path_imagen);
            }

            // Guardar la nueva imagen
            $path_imagen = $request->file('path_imagen')->store('usuarios', 'public');
            $user->path_imagen = $path_imagen;
        }
        $userUpdateData = [
            'email' => $validated['email'],
            'role' => $validated['role'],
        ];

        if (!empty($validated['password'])) {
            $userUpdateData['password'] = Hash::make($validated['password']);
        }

        $user->update($userUpdateData);

        return response()->json($user, 200);
    }

    public function destroy($id)
    {
        User::destroy($id);
        return response()->json(null, 204);
    }

    /* if (!Gate::allows('update-documents-status')) {
        return response()->json(['error' => 'No autorizado para actualizar documentos'], 403);
    } */
    public function updateDocumentsStatus(Request $request, $id)
    {

        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        $validated = $request->validate([
            'ine.estado' => 'required|in:pendiente,aprobado,rechazado',
            'ine.comentarios' => 'nullable|string|max:1000',
            'comprobante_domicilio.estado' => 'required|in:pendiente,aprobado,rechazado',
            'comprobante_domicilio.comentarios' => 'nullable|string|max:1000',
            'acta_nacimiento.estado' => 'required|in:pendiente,aprobado,rechazado',
            'acta_nacimiento.comentarios' => 'nullable|string|max:1000',
            'curp.estado' => 'required|in:pendiente,aprobado,rechazado',
            'curp.comentarios' => 'nullable|string|max:1000',
        ]);

        try {
            $estadoDocumentos = [];
            DB::beginTransaction();

            foreach (['ine', 'comprobante_domicilio', 'acta_nacimiento', 'curp'] as $tipo) {
                $documento = Document::where('user_id', $user->id)->where('tipo', $tipo)->first();

                if ($documento) {
                    $documento->update([
                        'estado' => $validated[$tipo]['estado'],
                        'comentarios' => $validated[$tipo]['comentarios'] ?? $documento->comentarios,
                    ]);

                    $estadoDocumentos[$tipo] = [
                        'estado' => $validated[$tipo]['estado'],
                        'comentarios' => $validated[$tipo]['comentarios'] ?? null
                    ];
                }
            }

            DB::commit();

            $nombre = $user->cliente->nombre;

            Mail::to($user->email)
                ->send(new NuevoEstadoDocumentos($nombre, $estadoDocumentos, $request->user()->email));

            return response()->json(['message' => 'Estados de documentos actualizados con éxito'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'Error al actualizar los estados de los documentos',
                'detalle' => $e->getMessage(),
            ], 500);
        }
    }
}
