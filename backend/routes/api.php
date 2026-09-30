<?php

use App\Http\Controllers\AdoptionRequestController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PetController;
use App\Http\Controllers\AuthController;



Route::get('/test', function () {
    return response()->json([
        'message' => 'Laravel API is working!'
    ]);
});


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/pet/{id}',[PetController::class,'show']);
Route::get('/pets/',[PetController::class,'index']);

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'user']);

// Route::middleware('auth:sanctum')->post('/addPet', [PetController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/addPet', [PetController::class, 'store']);
    // Route::put('/pet/{id}',[PetController::class,'update']);
    Route::put('/pet/{pet}', [PetController::class, 'update']);
    Route::delete('/pet/{pet}', [PetController::class, 'destroy']);
    Route::post('/adoption-form',[AdoptionRequestController::class,'store']);
    Route::get('/adoption-requests', [AdoptionRequestController::class,'index']);
    Route::delete('/adoption-requests/{id}', [AdoptionRequestController::class,'destroy']);
    Route::get('/adoption-requests/received',[AdoptionRequestController::class, 'receivedRequests']);
    Route::patch('/adoption-requests/{id}/approve',[AdoptionRequestController::class, 'approve']);
    Route::patch('/adoption-requests/{id}/decline',[AdoptionRequestController::class, 'decline']);
    
});
