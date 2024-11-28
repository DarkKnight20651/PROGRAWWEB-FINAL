<?php

namespace App\Http\Controllers;

use App\Models\Inscription;
use Illuminate\Http\Request;

class InscriptionController extends Controller
{
    public function index()
{
    try {
        // Obtener todas las inscripciones con la relación 'user' cargada para optimizar las consultas
        $inscriptions = Inscription::with('user.cliente')->get(); // Usamos 'with' para cargar la relación de 'user' y 'cliente'

        // Formatear los datos para incluir el nombre del cliente
        $data = $inscriptions->map(function ($inscription) {
            // Obtener el cliente asociado con el user_id
            $cliente = $inscription->user->cliente; // Acceder al cliente relacionado con el usuario
            return [
                'id' => $inscription->id,
                'user_id' => $inscription->user_id,
                'category' => $inscription->category,
                'tipo' => $inscription->tipo,
                'alcance' => $inscription->alcance,
                'responsable' => $inscription->responsable,
                'observaciones' => $inscription->observaciones,
                'created_at' => $inscription->created_at,
                'updated_at' => $inscription->updated_at,
                'nombre' => $cliente ? $cliente->nombre : 'No asignado', // Si el cliente existe, mostrar su nombre
            ];
        });

        return response()->json($data, 200);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Error al obtener las inscripciones: ' . $e->getMessage(),
        ], 500);
    }
}



    // Método para manejar la inserción
    public function store(Request $request)
    {
        // Validación de los datos entrantes
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',  // Asegurarse de que el user_id existe en la tabla users
            'category' => 'required|string|max:1', // El curso debe tener solo una letra
            'tipo' => 'required|string|in:Renovacion,Obtencion',  // El tipo debe ser Renovación u Obtención
            'alcance' => 'required|string|in:Nacional,Internacional', // El alcance debe ser Nacional o Internacional
            'responsable' => 'nullable|string|max:25', // Opcional y de máximo 25 caracteres
            'observaciones' => 'nullable|string|max:50', // Opcional y de máximo 50 caracteres
        ]);

        // Verificar si el usuario ya está inscrito en un curso de la misma categoría
        $existingInscription = Inscription::where('user_id', $validated['user_id'])
            ->where('category', $validated['category'])
            ->first();

        if ($existingInscription) {
            return response()->json([
                'message' => 'Ya estás inscrito en un curso de esta categoría.',
            ], 400); // Responde con un código de error 400 (Bad Request)
        }

        try {
            // Crear la inscripción en la base de datos
            $inscription = Inscription::create([
                'user_id' => $validated['user_id'],
                'category' => $validated['category'],
                'tipo' => $validated['tipo'],
                'alcance' => $validated['alcance'],
                'responsable' => $validated['responsable'] ?? null, // Si no hay responsable, se pone null
                'observaciones' => $validated['observaciones'] ?? null, // Si no hay observaciones, se pone null
            ]);

            return response()->json([
                'message' => 'Inscripción realizada con éxito',
                'inscription' => $inscription
            ], 201); // Retorna la inscripción y un mensaje de éxito
        } catch (\Exception $e) {
            // Manejo de errores
            return response()->json([
                'message' => 'Error al realizar la inscripción: ' . $e->getMessage()
            ], 500);
        }
    }
}
