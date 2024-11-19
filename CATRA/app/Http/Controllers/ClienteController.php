<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class ClienteController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth:sanctum', except: ['store']),
        ];
    }

    public function index()
    {
        Gate::authorize('viewAny');
        $clientes = Cliente::with('user')->paginate(15);
        return response()->json($clientes);
    }

    public function store(Request $request)
    {
        $isLoggingIn = $request->query('signup') ? true : false;

        $validated = $request->validate([
            'email' => ['required', 'email', 'unique:users,email'],
            'curp' => 'required|string|unique:clientes|max:20',
            'telefono' => 'required|string|max:15',
            'nombre' => 'required|string|max:255',
            'ape_p' => 'required|string|max:255',
            'ape_m' => 'required|string|max:255',
            'fecha_nac' => 'required|date',
            'genero' => 'required|integer|max:1',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)->numbers()
            ],
        ]);

        try {
            DB::beginTransaction();

            $user = User::create([
                'email' => $validated['email'],
                'role' => 'cliente',
                'password' => Hash::make($validated['password']),
            ]);

            $cliente = new Cliente([
                'curp' => $validated['curp'],
                'telefono' => $validated['telefono'],
                'nombre' => $validated['nombre'],
                'ape_p' => $validated['ape_p'],
                'ape_m' => $validated['ape_m'],
                'fecha_nac' => $validated['fecha_nac'],
                'genero' => $validated['genero'],
            ]);


            $cliente = $user->cliente()->save($cliente);

            $token = null;
            if ($isLoggingIn) {
                $token = $user->createToken($user->email)->plainTextToken;
            }

            DB::commit();

            if ($isLoggingIn) {
                return response()->json(
                    [
                        'user' => $user,
                        'cliente' => $user->cliente,
                        'token' => $token
                    ],
                    201
                );
            }

            return response()->json(
                [
                    'user' => $user,
                    'cliente' => $user->cliente,
                ],
                201
            );
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Ocurrió un error al registrarte', 'obj_error' => $e], 500);
        }
    }

    public function show($curp)
    {
        try {
            $cliente = Cliente::where('curp', $curp)->with('user')->firstOrFail();
            Gate::authorize('view', [$cliente]);
            return response()->json($cliente);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Cliente no encontrado con la CURP proporcionada.',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function update(Request $request, $curp)
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'unique:users,email,' . $request->user()->id],
            'curp' => 'required|string|max:20',
            'telefono' => 'required|string|max:15',
            'nombre' => 'required|string|max:255',
            'ape_p' => 'required|string|max:255',
            'ape_m' => 'required|string|max:255',
            'fecha_nac' => 'required|date',
            'genero' => 'required|integer|max:1',
            'password' => [
                'nullable',
                'confirmed',
                Password::min(8)
            ],
        ]);

        try {
            DB::beginTransaction();
            $cliente = Cliente::where('curp', $curp)->firstOrFail();
            Gate::authorize("update", [$cliente]);

            $cliente->update([
                'telefono' => $validated['telefono'],
                'nombre' => $validated['nombre'],
                'ape_p' => $validated['ape_p'],
                'ape_m' => $validated['ape_m'],
                'fecha_nac' => $validated['fecha_nac'],
                'genero' => $validated['genero'],
            ]);

            $user = $cliente->user;

            $userUpdateData = [
                'email' => $validated['email'],
            ];

            if (!empty($validated['password'])) {
                $userUpdateData['password'] = Hash::make($validated['password']);
            }

            $user->update($userUpdateData);

            return response()->json(['message' => 'Se actualizó el cliente y su usuario asociado.']);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json(['error' => 'El cliente no se encontró.'], 404);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Un error ocurrió al actualizar los datos.'], 500);
        }
    }

    public function destroy($curp)
    {
        Gate::authorize('delete');
        try {
            $cliente = Cliente::findOrFail($curp);
            $cliente->delete();
            return response()->json([], 204);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Cliente no encontrado con la CURP proporcionada.',
                'error' => $e->getMessage()
            ], 404);
        }
    }
}
