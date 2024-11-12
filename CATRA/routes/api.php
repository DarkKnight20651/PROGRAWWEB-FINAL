<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\DocumentController;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
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
