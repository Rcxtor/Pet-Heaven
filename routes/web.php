<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PetController;



//after login routes
Route::middleware(['auth'])->group(function () { 
    Route::get('/dashboard', function () {return view('dashboard');})->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/pets/create', function() {return view('pets.create');})->name('pets.create');
    route::post('/pets/create', [PetController::class, 'store'])->name('pets.store');        
});

Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () { // for admin only
    
    // Only admins can reach these URLs:
    
    // Route::get('/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    // Route::get('/users', [AdminController::class, 'users'])->name('admin.users');
    // Route::delete('/pet/{id}', [AdminController::class, 'deletePet'])->name('admin.pet.delete');
    
});

//guest routes
Route::get('/', function () {return view('welcome');})->name('welcome');
route::get('/pets', [PetController::class, 'index'])->name('pets.index');
Route::get('/pets/{id}', [PetController::class, 'show'])->name('pets.show');

require __DIR__.'/auth.php';
