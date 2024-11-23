<?php

namespace App\Http\Controllers;

use App\Models\Respuesta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RespuestaController extends Controller
{
    // Método para obtener todas las respuestas
    public function index()
    {
        $respuestas = Respuesta::all();
        return response()->json($respuestas);
    }

    // Método para crear una nueva respuesta
    public function store(Request $request)
    {
        $request->validate([
            'texto' => 'required|string|max:255',
            'id_pregunta' => 'required|exists:preguntas,id',
            'is_correct' => 'required|boolean',
            'path_imagen' => 'nullable|image|mimes:jpg,jpeg,png|max:3500',
        ]);

        $respuesta = new Respuesta();
        $respuesta->texto = $request->texto;
        $respuesta->id_pregunta = $request->id_pregunta;
        $respuesta->is_correct = $request->is_correct;

        // Manejo de la imagen
        if ($request->hasFile('path_imagen')) {
            $imagenPath = $request->file('path_imagen')->store('respuestas', 'public');
            $respuesta->path_imagen = $imagenPath;
        }

        $respuesta->save();

        return response()->json($respuesta, 201);
    }

    // Método para obtener una respuesta específica
    public function show($id)
    {
        $respuesta = Respuesta::find($id);
        if (!$respuesta) {
            return response()->json(['message' => 'Respuesta no encontrada'], 404);
        }
        return response()->json($respuesta);
    }

    // Método para actualizar una respuesta
    public function update(Request $request, $id)
    {
        $respuesta = Respuesta::find($id);
        if (!$respuesta) {
            return response()->json(['message' => 'Respuesta no encontrada'], 404);
        }

        $request->validate([
            'texto' => 'required|string|max:255',
            'id_pregunta' => 'required|exists:preguntas,id',
            'is_correct' => 'required|boolean',
            'path_imagen' => 'nullable|image|mimes:jpg,jpeg,png|max:3500',
        ]);

        $respuesta->texto = $request->texto;
        $respuesta->id_pregunta = $request->id_pregunta;
        $respuesta->is_correct = $request->is_correct;

        // Manejo de la imagen
        if ($request->hasFile('path_imagen') && $request->file('path_imagen')->isValid()) {
            // Eliminar la imagen anterior si existe
            if ($respuesta->path_imagen) {
                Storage::delete($respuesta->path_imagen);
            }

            // Guardar la nueva imagen
            $path_imagen = $request->file('path_imagen')->store('preguntas', 'public');
            $respuesta->path_imagen = $path_imagen; // Actualizar la ruta en el modelo
        }
        $respuesta->fill($request->except('path_imagen'));
        $respuesta->save();

        return response()->json([
            'message' => 'Pregunta actualizada exitosamente.',
            'pregunta' => $respuesta,
        ]);
    }

    // Método para eliminar una respuesta
    public function destroy($id)
    {
        $respuesta = Respuesta::find($id);
        if (!$respuesta) {
            return response()->json(['message' => 'Respuesta no encontrada'], 404);
        }

        // Eliminar la imagen si existe
        if ($respuesta->path_imagen && Storage::exists('public/' . $respuesta->path_imagen)) {
            Storage::delete('public/' . $respuesta->path_imagen);
        }

        $respuesta->delete();

        return response()->json(['message' => 'Respuesta eliminada correctamente']);
    }
    public function getRespuestasByPregunta($id_pregunta)
    {
        $respuestas = Respuesta::where('id_pregunta', $id_pregunta)->get();

        if ($respuestas->isEmpty()) {
            return response()->json([
                'message' => 'No se encontraron preguntas para este examen.',
            ], 404);
        }

        return response()->json([
            'pregunta_id' => $id_pregunta,
            'respuestas' => $respuestas,
        ]);
    }
}
