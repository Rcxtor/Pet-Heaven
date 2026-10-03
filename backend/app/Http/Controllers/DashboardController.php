<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pet;
use App\Models\AdoptionRequest;
use App\Models\AdoptionHistory;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();


        $myPetsCount = Pet::where('user_id', $user->id)->count();

        $requestsSentCount = AdoptionRequest::where('user_id', $user->id)->count();

        $requestsReceivedCount = AdoptionRequest::whereHas('pet', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->count();

        $adoptedPetsCount = AdoptionHistory::where('user_id', $user->id)->count();


        // Latest 4 pets
        $myPets = Pet::where('user_id', $user->id)
            ->latest()
            ->take(4)
            ->get();


        // Latest 4 requests received
        $requestsReceived = AdoptionRequest::whereHas('pet', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })
        ->latest()
        ->take(4)
        ->get();


        // Latest 4 requests sent
        $requestsSent = AdoptionRequest::where('user_id', $user->id)
            ->latest()
            ->take(4)
            ->get();


        return response()->json([
            'stats' => [
                'myPets' => $myPetsCount,
                'requestsSent' => $requestsSentCount,
                'requestsReceived' => $requestsReceivedCount,
                'adoptedPets' => $adoptedPetsCount,
            ],

            'myPets' => $myPets,

            'requestsReceived' => $requestsReceived,

            'requestsSent' => $requestsSent,
        ]);
    }
}

