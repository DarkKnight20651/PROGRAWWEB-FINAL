<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseUser;
use App\Models\Instructor;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function store(Request $request)
{
    try {
        $validatedData = $request->validate([
            'category' => 'required|string|max:255',
            'users' => 'required|array', // Validar que se envíe una lista de usuarios
            'users.*.id' => 'required|integer', // Validar que cada usuario tenga un ID válido
        ]);

        // Obtiene las CURPs ya asignadas a cursos
        $usedCurps = \App\Models\Course::pluck('instructor_curp')->toArray();

        // Selecciona aleatoriamente un instructor que no esté en $usedCurps
        $randomInstructor = \App\Models\Instructor::whereNotIn('curp', $usedCurps)
            ->inRandomOrder()
            ->first();

        // Verifica si hay instructores disponibles
        if (!$randomInstructor) {
            return response()->json([
                'error' => 'No available instructors',
            ], 400); // Código 400: Bad Request
        }

        // Crea el curso asignando el CURP del instructor seleccionado
        $course = Course::create([
            'category' => $validatedData['category'],
            'name' => "Curso de " . $validatedData['category'],
            'instructor_curp' => $randomInstructor->curp,
        ]);

        // Inserta usuarios en la tabla course_user
        $usersData = array_map(function ($user) use ($course) {
            return [
                'course_id' => $course->id,
                'user_id' => $user['id'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }, $validatedData['users']);

        \DB::table('course_users')->insert($usersData);

        // Retorna una respuesta exitosa con el curso creado y usuarios asociados
        return response()->json([
            'message' => 'Course and users associated successfully',
            'course' => $course,
            'users' => $usersData,
        ], 201); // Código 201: Created

    } catch (\Exception $e) {
        // En caso de error, se registra y se retorna el error
        \Log::error('Error al crear el curso: ' . $e->getMessage());
        return response()->json([
            'error' => 'Failed to create course',
            'message' => $e->getMessage(),
        ], 500); // Código 500: Internal Server Error
    }
}

}