<?php
namespace Database\Factories;

use App\Models\Pet;
use App\Models\PetImage;
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
            'breed' => $this->faker->randomElement([
                                                    'Labrador Retriever',
                                                    'German Shepherd',
                                                    'Golden Retriever',
                                                    'Poodle',
                                                    'Beagle',
                                                    'Persian',
                                                    'Siamese',
                                                    'British Shorthair',
                                                    'Maine Coon',
                                                    'Parakeet',
                                                    'Cockatiel',
                                                    'Holland Lop',
                                                    'Netherland Dwarf',
                                                    'Mixed Breed'
                                                ]),
            'description' => $this->faker->sentence(10),
            'location' => $this->faker->randomElement(['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh' ]),
            'size' => $this->faker->randomElement(['small', 'medium', 'large']),
            'status' => 'available',
            'user_id' => User::where('role', 'user')->inRandomOrder()->first()->id,
        ];
    }
    public function configure()
    {
        return $this->afterCreating(function (Pet $pet) {

            $images = glob(public_path('demo_img/*'));

            if (!empty($images)) {

                $randomImage = $this->faker->randomElement($images);

                PetImage::create([
                    'pet_id' => $pet->id,
                    'image_path' => 'demo_img/' . basename($randomImage),
                ]);
            }
        });
    }
}
