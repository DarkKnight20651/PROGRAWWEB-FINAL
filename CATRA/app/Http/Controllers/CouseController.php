<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseUser;
use Illuminate\Http\Request;

class CouseController extends Controller
{
    public function generateCourses(Request $request)
    {
        try {
            $categories = $request->all();

            $courses = [];
            foreach ($categories as $category => $users) {
                // Crear un curso para la categoría
                $course = Course::create([
                    'name' => "Curso para categoría $category",
                    'category' => $category,
                ]);

                // Asociar los usuarios al curso en la tabla curso-user
                foreach ($users as $user) {
                    CourseUser::create([
                        'course_id' => $course->id,
                        'user_id' => $user['id'],
                    ]);
                }

                $courses[] = $course;
            }

            return response()->json(['success' => true, 'courses' => $courses]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
}
