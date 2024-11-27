<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Examen;

class ExamenController extends Controller
{
    public function index()
    {
        $examenes = Examen::all();
        return response()->json($examenes);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'duracion' => 'required|integer',
            'tipo' => 'required|string|max:100',
            'tipo_licencia' => 'required|string',
        ]);

        $examen = Examen::create($validatedData);

        return response()->json([
            'message' => 'Examen creado con éxito',
            'examen' => $examen
        ], 201);
    }

    public function show($id)
    {
        $examen = Examen::find($id);

        if (!$examen) {
            return response()->json(['message' => 'Examen no encontrado'], 404);
        }

        return response()->json($examen);
    }

    public function update(Request $request, $id)
    {
        $examen = Examen::find($id);

        if (!$examen) {
            return response()->json(['message' => 'Examen no encontrado'], 404);
        }

        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'duracion' => 'required|integer',
            'descripcion' => 'nullable|string',
            'tipo' => 'required|string|max:100',
            'tipo_licencia' => 'required|string',
        ]);

        $examen->update($validatedData);

        return response()->json([
            'message' => 'Examen actualizado con éxito',
            'examen' => $examen
        ]);
    }

    public function destroy($id)
    {
        $examen = Examen::find($id);

        if (!$examen) {
            return response()->json(['message' => 'Examen no encontrado'], 404);
        }

        $examen->delete();

        return response()->json(['message' => 'Examen eliminado con éxito']);
    }

    public function getAll($id)
    {
        $examen = Examen::find($id);
        if (!$examen) {
            return response()->json(['message' => 'Examen no encontrado'], 404);
        }
        $all = $examen->with('Preguntas.Respuestas')->get();
        return response()->json($all);
    }
}
