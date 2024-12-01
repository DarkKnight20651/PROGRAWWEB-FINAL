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
Route::post('/examenes/terminar', [ExamenController::class, 'terminar']);
Route::post('/examenes/comenzar', [ExamenController::class, 'comenzar']);


Route::apiResource('clientes', ClienteController::class);

Route::get('examen/{id}/all', [ExamenController::class, 'getAll']);
Route::get('cliente/{curp}/examenes', [ClienteController::class, 'getExamens']);
Route::get('examen/{id_examen}/preguntas', [PreguntaController::class, 'getPreguntasByExamen']);
Route::get('pregunta/{id_pregunta}/respuestas', [RespuestaController::class, 'getRespuestasByPregunta']);

Route::apiResource('preguntas', PreguntaController::class);
Route::apiResource('examenes', ExamenController::class);
Route::apiResource('respuestas', RespuestaController::class);

Route::middleware('auth:sanctum')->group(function () {

    Route::apiResource('/users', UserController::class);

    Route::post("/users/documents-status/{id}", [UserController::class, 'updateDocumentsStatus']);

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/user', function (Request $request) {
        $user = $request->user();
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
