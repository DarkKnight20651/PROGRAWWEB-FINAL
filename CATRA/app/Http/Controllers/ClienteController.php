<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;

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
            'genero' => 'required|string|max:1',
            'id_user' => 'required|integer',
        ]);

        $cliente = Cliente::create($validatedData);

        return response()->json([
            'cliente' => $cliente,
        ], 201);
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
            'genero' => 'required|string|max:1',
        ]);

        $cliente = Cliente::where('curp', $curp)->firstOrFail();
        $cliente->update($validatedData);

        return response()->json($cliente);
    }

    public function destroy($id)
    {
        $cliente = Cliente::findOrFail($id);
        $cliente->delete();

        return response()->json(null, 204);
    }
}
