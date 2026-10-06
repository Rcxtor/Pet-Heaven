<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Pet;
use App\Models\PetImage;

class PetController extends Controller
{
    /**
     * Get all available pets.
     */
    public function index()
    {
        $pets = Pet::where('status', 'available')
            ->with('images')
            ->get();

        return response()->json($pets);
    }

    /**
     * Get pets belonging to logged-in user.
     */
    public function userPets()
    {
        $pets = Pet::where('user_id', auth()->id())
            ->with('images')
            ->get();

        return response()->json($pets);
    }

    /**
     * Get one pet.
     */
    public function show($id)
    {
        $pet = Pet::with('images')->find($id);

        if (!$pet) {
            return response()->json([
                'message' => 'Pet not found'
            ], 404);
        }

        return response()->json($pet);
    }

    /**
     * Create a new pet.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'species' => 'required|string|max:255',
            'breed' => 'nullable|string|max:255',
            'age' => 'nullable|string|min:0',
            'size' => 'required|in:small,medium,large',
            'gender' => 'required|in:male,female',
            'location' => 'required|string|max:255',
            'description' => 'nullable|string',

            // Maximum 4 images
            'images' => 'nullable|array|max:4',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        $pet = new Pet();

        $pet->name = $request->name;
        $pet->species = $request->species;
        $pet->breed = $request->breed;
        $pet->age = $request->age;
        $pet->size = $request->size;
        $pet->gender = $request->gender;
        $pet->location = $request->location;
        $pet->description = $request->description;

        // Save the pet first
        auth()->user()->pets()->save($pet);

        // Save the uploaded images
        if ($request->hasFile('images')) {

            foreach ($request->file('images') as $image) {

                $imagePath = $image->store('pets', 'public');

                $pet->images()->create([
                    'image_path' => '/storage/' . $imagePath,
                ]);
            }
        }

        // Load images before returning
        $pet->load('images');

        return response()->json([
            'message' => 'Pet created successfully.',
            'pet' => $pet,
        ], 201);
    }

    /**
     * Update pet.
     */
    public function update(Request $request, Pet $pet)
    {
        // Only the owner can edit the pet
        if ($pet->user_id != auth()->id()) {
            return response()->json([
                'message' => 'Forbidden'
            ], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'species' => 'required|string|max:255',
            'breed' => 'nullable|string|max:255',
            'age' => 'nullable|string|min:0',
            'size' => 'required|in:small,medium,large',
            'location' => 'required|string|max:255',
            'gender' => 'required|in:male,female',
            'description' => 'nullable|string',
        ]);

        $pet->name = $validated['name'];
        $pet->species = $validated['species'];
        $pet->breed = $validated['breed'] ?? null;
        $pet->age = $validated['age'] ?? null;
        $pet->size = $validated['size'];
        $pet->location = $validated['location'];
        $pet->gender = $validated['gender'];
        $pet->description = $validated['description'] ?? null;

        $pet->save();

        return response()->json([
            'message' => 'Pet updated successfully.',
            'pet' => $pet->load('images'),
        ]);
    }

    /**
     * Delete a pet.
     */
    public function destroy(Pet $pet)
    {
        if ($pet->user_id !== auth()->id()) {
            return response()->json([
                'message' => 'Forbidden'
            ], 403);
        }

        // Delete image files from storage
        foreach ($pet->images as $image) {

            $path = str_replace('/storage/', '', $image->image_path);

            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
            }
        }

        // Delete the pet.
        // pet_images will also be deleted because of cascadeOnDelete().
        $pet->delete();

        return response()->json([
            'message' => 'Pet deleted successfully'
        ]);
    }
    public function deleteImage(Pet $pet, PetImage $image)
    {

        if ($pet->user_id !== auth()->id()) {
            return response()->json([
                'message' => 'Forbidden'
            ], 403);
        }

        if ($image->pet_id !== $pet->id) {
            return response()->json([
                'message' => 'Image does not belong to this pet.'
            ], 403);
        }

        $path = str_replace('/storage/', '', $image->image_path);

        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }

        $image->delete();

        return response()->json([
            'message' => 'Image deleted successfully.'
        ]);
    }
    public function addImages(Request $request, Pet $pet)
    {
        if ($pet->user_id !== auth()->id()) {
            return response()->json([
                'message' => 'Forbidden'
            ], 403);
        }

        $request->validate([
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        $currentImageCount = $pet->images()->count();
        $newImageCount = count($request->file('images'));

        if (($currentImageCount + $newImageCount) > 4) {
            return response()->json([
                'message' => 'A pet can have a maximum of 4 images.'
            ], 422);
        }

        foreach ($request->file('images') as $image) {
            $imagePath = $image->store('pets', 'public');

            $pet->images()->create([
                'image_path' => '/storage/' . $imagePath,
            ]);
        }

        return response()->json([
            'message' => 'Images added successfully.',
            'pet' => $pet->load('images'),
        ]);
    }
}