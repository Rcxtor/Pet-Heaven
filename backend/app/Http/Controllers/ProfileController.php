<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\AdoptionHistory;
use App\Models\Pet;


class ProfileController extends Controller
{
    public function show(Request $request)
    {
        return response()->json([
            'user' => $request->user()
        ]);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:30|unique:users,phone,' . $user->id,
            'city' => 'nullable|string|max:255',
        ]);

        $user->update([
            'name' => $validated['name'],
            'phone' => $validated['phone'] ?? null,
            'city' => $validated['city'] ?? null,
        ]);

        return response()->json([
            'message' => 'Profile updated successfully.',
            'user' => $user->fresh(),
        ]);
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'Current password is incorrect.'
            ], 422);
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'Password changed successfully.'
        ]);
    }

    public function destroy(Request $request)
    {
        $user = $request->user();

        $ownsPets = Pet::where('user_id', $user->id)->exists();

        if ($ownsPets) {
            return response()->json([
                'message' => 'You cannot delete your account while you own pets.'
            ], 422);
        }

        $hasAdoptionHistory = AdoptionHistory::where(
            'user_id',
            $user->id
        )->exists();

        if ($hasAdoptionHistory) {
            return response()->json([
                'message' => 'You cannot delete your account because you have adoption history.'
            ], 422);
        }

        $user->delete();

        return response()->json([
            'message' => 'Account deleted successfully.'
        ]);
    }
}