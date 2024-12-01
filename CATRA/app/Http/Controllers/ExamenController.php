<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Examen;
use App\Models\Examens_asignado;
use App\Models\RespuestaExamen;
use Illuminate\Support\Carbon;

class ExamenController extends Controller
{
    public function index()
    {
        $examenes = Examen::all();
        return response()->json($examenes);
    }
    public function comenzar(Request $request)
    {
        $examen = Examens_asignado::where('id_cliente', $request->curp)
            ->where('id_examen', $request->examenId)
            ->where('estado', 'asignado')
            ->firstOrFail();
        $examen->estado = 'realizando';
        $examen->hora_inicio = Carbon::now();
        $examen->save();
    }
    public function terminar(Request $request){
        $examen = Examens_asignado::where('id_cliente', $request->curp)
        ->where('id_examen', $request->examenId)
        ->where('estado', 'realizando')
        ->firstOrFail();

        $examenId=$examen->id;
        $respuestas = $request->respuestas;

        foreach ($respuestas as $preguntaId => $respuestaId) {
            // Aquí puedes procesar cada par de pregunta y respuesta
            // Ejemplo: guardar en la base de datos
            RespuestaExamen::create([
                'id_pregunta' => $preguntaId,
                'id_respuesta' => $respuestaId,
                'id_examen_asignado' => $examenId,
            ]);
        }
        
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
