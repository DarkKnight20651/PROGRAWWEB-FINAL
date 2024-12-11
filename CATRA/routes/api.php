<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ExamenController;
use App\Http\Controllers\PreguntaController;
use App\Http\Controllers\RespuestaController;
use App\Http\Controllers\InscriptionController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CourseUserController;


Route::post('/examenes/terminar', [ExamenController::class, 'terminar']);
Route::post('/examenes/comenzar', [ExamenController::class, 'comenzar']);
Route::post('/examenes/getTiempoRestante', [ExamenController::class, 'getTiempoRestante']);
Route::post('/examenes/autoguardar', [ExamenController::class, 'autoguardado']);
Route::post('/user/courses', [CourseController::class, 'getUserCourses']);

Route::post('/instructor/cursos', [CourseController::class, 'getCursosInstructor']);
//Route::get('/courses', [CourseController::class, 'getAllCourses']);
Route::get('/course-user', [CourseUserController::class, 'getCourseUsers']);
Route::post('/inscriptions', [InscriptionController::class, 'store']);
Route::post('/user/documents', [DocumentController::class, 'getUserDocuments']);
Route::get('/inscriptions', [InscriptionController::class, 'index']);
Route::put('/inscriptions/{id}', [InscriptionController::class, 'update']);
Route::post('/courses', [CourseController::class, 'store']);

Route::apiResource('clientes', ClienteController::class);

Route::get('examen/{id}/all', [ExamenController::class, 'getAll']);
Route::get('cliente/{curp}/examenes', [ClienteController::class, 'getExamens']);
Route::get('examen/{id_examen}/preguntas', [PreguntaController::class, 'getPreguntasByExamen']);
Route::get('pregunta/{id_pregunta}/respuestas', [RespuestaController::class, 'getRespuestasByPregunta']);

Route::prefix('preguntas')->group(function () {
    Route::get('/', [PreguntaController::class, 'index'])->name('preguntas.index');
    Route::post('/', [PreguntaController::class, 'store'])->name('preguntas.store');
    Route::get('/{pregunta}', [PreguntaController::class, 'show'])->name('preguntas.show');
    Route::put('/{pregunta}', [PreguntaController::class, 'update'])->name('preguntas.update');
    Route::delete('/{pregunta}', [PreguntaController::class, 'destroy'])->name('preguntas.destroy');
});

Route::prefix('examenes')->group(function () {
    Route::get('/', [ExamenController::class, 'index'])->name('examenes.index');
    Route::post('/', [ExamenController::class, 'store'])->name('examenes.store');
    Route::get('/{examen}', [ExamenController::class, 'show'])->name('examenes.show');
    Route::put('/{examen}', [ExamenController::class, 'update'])->name('examenes.update');
    Route::delete('/{examen}', [ExamenController::class, 'destroy'])->name('examenes.destroy');
});

Route::prefix('respuestas')->group(function () {
    Route::get('/', [RespuestaController::class, 'index'])->name('respuestas.index');
    Route::post('/', [RespuestaController::class, 'store'])->name('respuestas.store');
    Route::get('/{respuesta}', [RespuestaController::class, 'show'])->name('respuestas.show');
    Route::put('/{respuesta}', [RespuestaController::class, 'update'])->name('respuestas.update');
    Route::delete('/{respuesta}', [RespuestaController::class, 'destroy'])->name('respuestas.destroy');
});

Route::middleware('auth:sanctum')->group(function () {


    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('users.index');
        Route::post('/', [UserController::class, 'store'])->name('users.store');
        Route::get('/{user}', [UserController::class, 'show'])->name('users.show');
        Route::put('/{user}', [UserController::class, 'update'])->name('users.update');
        Route::delete('/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    });


    Route::post("/users/documents-status/{id}", [UserController::class, 'updateDocumentsStatus']);

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/user', function (Request $request) {
        $user = $request->user()->load('cliente');

        return response()->json([
            'user' => $user,
            'token' => $request->bearerToken()
        ]);
    });

    Route::prefix('documents')->group(function () {
        Route::post('/upload', [DocumentController::class, 'store']);
        Route::get('/details', [DocumentController::class, 'getDocumentDetails']);
        Route::get('/details/{id}', [DocumentController::class, 'getDocumentDetailsById']);
        Route::get('/show/{id}', [DocumentController::class, 'show']);
    });
});

Route::post('/login', [AuthController::class, 'login']);
