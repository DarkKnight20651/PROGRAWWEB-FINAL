<?php

namespace App\Http\Controllers;

use App\Models\Pregunta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PreguntaController extends Controller
{
    /**
     * Muestra todas las preguntas.
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function index()
    {
        $preguntas = Pregunta::all();
        return response()->json($preguntas);
    }

    /**
     * Almacena una nueva pregunta.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {

        $request->validate([
            'texto' => 'required|string|max:255',
            'id_examen' => 'required|exists:examenes,id',
            'path_imagen' => 'nullable|image|mimes:jpg,jpeg,png|max:3000',
        ]);

        $path_imagen = null;

        if ($request->hasFile('path_imagen') && $request->file('path_imagen')->isValid()) {
            $path_imagen = $request->file('path_imagen')->store('preguntas', 'public');
        }

        $pregunta = Pregunta::create([
            'texto' => $request->texto,
            'id_examen' => $request->id_examen,
            'path_imagen' => $path_imagen,
        ]);

        return response()->json([
            'message' => 'Pregunta creada exitosamente.',
            'pregunta' => $pregunta,
        ], 201);
    }

    public function show($id)
    {
        $pregunta = Pregunta::find($id);

        if (!$pregunta) {
            return response()->json(['message' => 'Pregunta no encontrada.'], 404);
        }

        return response()->json($pregunta);
    }

    public function update(Request $request, $id)
    {
        // Buscar la pregunta en la base de datos
        $pregunta = Pregunta::find($id);

        if (!$pregunta) {
            return response()->json(['message' => 'Pregunta no encontrada.'], 404);
        }

        // Validar los campos, permitiendo que algunos sean opcionales
        $request->validate([
            'texto' => 'required|string|max:255',
            'id_examen' => 'required|exists:examenes,id',
            'path_imagen' => 'nullable|image|mimes:jpg,jpeg,png|max:3000',
        ]);

        // Si hay una imagen en la solicitud
        if ($request->hasFile('path_imagen') && $request->file('path_imagen')->isValid()) {
            // Eliminar la imagen anterior si existe
            if ($pregunta->path_imagen) {
                Storage::delete($pregunta->path_imagen);
            }

            // Guardar la nueva imagen
            $path_imagen = $request->file('path_imagen')->store('preguntas', 'public');
            $pregunta->path_imagen = $path_imagen;
        }

        // Actualizar solo los campos enviados
        $pregunta->fill($request->except('path_imagen'));
        $pregunta->save();

        return response()->json([
            'message' => 'Pregunta actualizada exitosamente.',
            'pregunta' => $pregunta,
        ]);
    }


    /**
     * Elimina una pregunta específica.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $pregunta = Pregunta::find($id);

        if (!$pregunta) {
            return response()->json(['message' => 'Pregunta no encontrada.'], 404);
        }

        $pregunta->delete();
        return response()->json(['message' => 'Pregunta eliminada exitosamente.']);
    }

    /**
     * Obtiene las preguntas de un examen en particular.
     *
     * @param int $id_examen
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPreguntasByExamen($id_examen)
    {
        $preguntas = Pregunta::where('id_examen', $id_examen)->get();

        if ($preguntas->isEmpty()) {
            return response()->json([
                'message' => 'No se encontraron preguntas para este examen.',
            ], 404);
        }

        return response()->json([
            'examen_id' => $id_examen,
            'preguntas' => $preguntas,
        ]);
    }
}
