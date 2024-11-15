<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ClienteController;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('users', UserController::class);
    Route::apiResource('clientes', ClienteController::class);

    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::get('/user', function (Request $request) {
        $user = $request->user();
        $cliente = $user->cliente;

        if($cliente) {
            return response()->json([
                'user' => $user,
            ]);
        }

        return response()->json([
            'user' => $user,
            'cliente' => $cliente
        ]);
    });

    Route::prefix('documents')->group(function () {
        Route::post('/upload', [DocumentController::class, 'store']);
        Route::get('/details', [DocumentController::class, 'getDocumentDetails']);
        Route::get('/show/{id}', [DocumentController::class, 'show']);
        Route::post('/update/{id}', [DocumentController::class, 'update']);
    });
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
