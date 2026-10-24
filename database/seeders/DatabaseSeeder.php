<?php

namespace Database\Seeders;

use App\Models\Pet;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(30)->create();

        $user = User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('password123'),
        ]);
        $user2 = User::create([
            'name' => 'Test User2',
            'email' => 'test2@example.com',
            'password' => Hash::make('password123'),
        ]);


        Pet::factory(2)->create([
            'user_id' => $user->id,
        ]);


        Pet::factory(2)->create([
            'user_id' => $user2->id,
        ]);

        Pet::factory(50)->create();
    }
}
