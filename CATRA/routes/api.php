<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ClienteController;


Route::apiResource('clientes', ClienteController::class);

Route::middleware('auth:sanctum')->group(function () {

    Route::apiResource('/users', UserController::class);

    Route::post("/users/documents-status", [UserController::class, 'updateDocumentsStatus']);

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
        Route::get('/show/{id}', [DocumentController::class, 'show']);
    });
});

Route::post('/login', [AuthController::class, 'login']);
