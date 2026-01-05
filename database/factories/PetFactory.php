<?php

namespace Database\Factories;

use App\Models\Pet;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PetFactory extends Factory
{
    protected $model = Pet::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->firstName,
            'species' => $this->faker->randomElement(['Dog', 'Cat','Bird', 'Rabbit','other']),
            'age' => $this->faker->numberBetween(1, 8),
            'gender' => $this->faker->randomElement(['Male', 'Female']),
            'location' => $this->faker->randomElement([
                'Dhaka', 'Chattogram', 'Sylhet', 'Rajshahi', 'Khulna'
            ]),
            'description' => $this->faker->sentence(10),
            'status' => 'available',
            'user_id' => User::where('role', 'user')->inRandomOrder()->first()->id,
        ];
    }
}
