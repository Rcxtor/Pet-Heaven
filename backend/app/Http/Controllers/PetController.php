<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pet;

class PetController extends Controller
{
    /**
     * Get all available pets.
     */
    public function index()
    {
        $pets = Pet::where('status', 'available')->get();
        return response()->json($pets);
    }

    /**
     * Get one pet.
     */
    public function show($id)
    {
        $pet = Pet::find($id);

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
            'location' => 'nullable|string|max:255',
            'age' => 'nullable|integer|min:0',
            'size' => 'required|in:small,medium,large',
            'gender' => 'required|in:male,female',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $pet = new Pet();

        $pet->name = $request->name;
        $pet->species = $request->species;
        $pet->breed = $request->breed;
        $pet->age = $request->age;
        $pet->size = $request->size;
        $pet->location = $request->location;
        $pet->gender = $request->gender;
        $pet->description = $request->description;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('pets', 'public');
            $pet->image = '/storage/' . $imagePath;
        }

        auth()->user()->pets()->save($pet);

        return response()->json([
            'message' => 'Pet created successfully.',
            'pet' => $pet,
        ], 201);
    }

    /**
     * Updade PEt
     */
    public function update(Request $request, Pet $pet)
        {
            // Only the user who created the pet can edit it
            if ($pet->user_id != auth()->id()) {
                return response()->json([
                    'message' => 'Forbidden'
                ], 403);
            }

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'species' => 'required|string|max:255',
                'breed' => 'nullable|string|max:255',
                'location' => 'nullable|string|max:255',
                'age' => 'nullable|integer|min:0',
                'size' => 'required|in:small,medium,large',
                'gender' => 'required|in:male,female',
                'description' => 'nullable|string',
            ]);

            $pet->name = $validated['name'];
            $pet->species = $validated['species'];
            $pet->breed = $validated['breed'] ?? null;
            $pet->location = $validated['location'] ?? null;
            $pet->age = $validated['age'] ?? null;
            $pet->size = $validated['size'];
            $pet->gender = $validated['gender'];
            $pet->description = $validated['description'] ?? null;

            $pet->save();

            return response()->json([
                'message' => 'Pet updated successfully.',
                'pet' => $pet,
            ]);
        }

    /**
     * DELETE BOOm
     */
    public function destroy(Pet $pet)
    {
        if ($pet->user_id !== auth()->id()) {
            return response()->json([
                'message' => 'Forbidden'
            ], 403);
        }

        $pet->delete();

        return response()->json([
            'message' => 'Pet deleted successfully'
        ]);
}
}