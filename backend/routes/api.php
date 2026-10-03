<?php

use App\Http\Controllers\AdoptionRequestController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PetController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;



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
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);


Route::middleware('auth:sanctum')->group(function () {

//pet routes
    Route::post('/addPet', [PetController::class, 'store']);
    Route::get('/my-pets/',[PetController::class,'userPets']);
    // Route::put('/pet/{id}',[PetController::class,'update']);
    Route::put('/pet/{pet}', [PetController::class, 'update']);
    Route::delete('/pet/{pet}', [PetController::class, 'destroy']);

//Adoption Routes
    Route::post('/adoption-form',[AdoptionRequestController::class,'store']);
    Route::get('/adoption-requests/check-profile',[AdoptionRequestController::class, 'checkProfile']);
    Route::get('/adoption-requests', [AdoptionRequestController::class,'index']);
    Route::patch('/adoption-requests/{id}/cancel',[AdoptionRequestController::class, 'cancel']);
    Route::get('/adoption-requests/received',[AdoptionRequestController::class, 'receivedRequests']);
    Route::patch('/adoption-requests/{id}/select',[AdoptionRequestController::class, 'select']);
    Route::patch('/adoption-requests/{id}/cancel-selection',[AdoptionRequestController::class, 'cancelSelection']);
    Route::patch('/adoption-requests/{id}/complete',[AdoptionRequestController::class, 'complete']);
    Route::patch('/adoption-requests/{id}/decline',[AdoptionRequestController::class, 'decline']);
    Route::get('/adoption-requests/received/{id}',[AdoptionRequestController::class, 'receivedRequest']);

//dashboard
    Route::middleware('auth:sanctum')->get('/dashboard', [DashboardController::class, 'index']);

//profile
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::put('/profile/password', [ProfileController::class, 'updatePassword']);
    Route::delete('/profile', [ProfileController::class, 'destroy']);
    
});
