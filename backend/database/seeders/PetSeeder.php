<?php

namespace Database\Seeders;

use App\Models\Pet;
use App\Models\User;
use Illuminate\Database\Seeder;

class PetSeeder extends Seeder
{

public function run(): void
{
    Pet::factory()->count(30)->create();
}

}