<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class ClienteController extends Controller
{
    public function index()
    {
        return  Cliente::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'curp' => 'required|string|unique:clientes|max:20',
            'telefono' => 'required|string|max:15',
            'nombre' => 'required|string|max:255',
            'ape_p' => 'required|string|max:255',
            'ape_m' => 'required|string|max:255',
            'fecha_nac' => 'required|date',
            'genero' => 'required|integer|max:1',
            'id_user' => 'required|integer',
        ]);

        $cliente = Cliente::create($validatedData);

        return response()->json([
            'cliente' => $cliente,
        ], 201);
    }

    public function registrar(Request $request)
    {
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
                Password::min(8)
            ],
        ]);

        try {
            DB::beginTransaction();

            $user = User::create([
                'email' => $validated['email'],
                'role' => 'cliente',
                'password' => Hash::make($validated['password']),
            ]);

            $token = $user->createToken($user->email)->plainTextToken;

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

            DB::commit();
            return response()->json(
                [
                    'user' => $user,
                    'cliente' => $user->cliente,
                    'token' => $token
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
        $cliente = Cliente::where('curp', $curp)->firstOrFail();
        return response()->json($cliente);
    }

    public function update(Request $request, $curp)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'ape_p' => 'required|string|max:255',
            'ape_m' => 'required|string|max:255',
            'curp' => 'required|string|max:20',
            'fecha_nac' => 'required|date',
            'telefono' => 'required|string|max:15',
            'genero' => 'required|integer|max:1',
        ]);

        $cliente = Cliente::where('curp', $curp)->firstOrFail();
        $cliente->update($validatedData);

        return response()->json($cliente);
    }

    public function destroy($curp)
    {
        $cliente = Cliente::findOrFail($curp);
        $cliente->delete();

        return response()->json(null, 204);
    }
}
