<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AdoptionRequest;
use App\Models\Pet;
use Illuminate\Support\Facades\DB;

class AdoptionRequestController extends Controller
{
    public function store(Request $request)
    {

        $validated = $request->validate([
            'pet_id' => 'required|exists:pets,id',
            'exp' => 'required|in:yes,no',
            'email' => 'nullable|email',
            'name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'reason' => 'nullable|string',
        ]);


        $pet = Pet::findOrFail($request->pet_id);

        if ($pet->status !== 'available') {
            return response()->json([
                'message' => 'This pet is no longer available for adoption.'
            ], 422);
        }


        $user = $request->user();

        if ($pet->user_id === $user->id) {
            return response()->json([
                'message' => 'You cannot apply to adopt your own pet.'
            ], 422);
        }

        $existingRequest = AdoptionRequest::where('user_id', $user->id)
            ->where('pet_id', $pet->id)
            ->where('status', 'Pending')
            ->first();

        if ($existingRequest) {
            return response()->json([
                'message' => 'You already have a pending adoption request for this pet.'
            ], 422);
        }

        // Create 
        $adoptionRequest = AdoptionRequest::create([
            'user_id' => $user->id,
            'pet_id' => $pet->id,
            'exp' => $validated['exp'],
            'email' => $validated['email'] ?? null,
            'name' => $validated['name'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'address' => $validated['address'] ?? null,
            'reason' => $validated['reason'] ?? null,
            'status' => 'Pending',
        ]);

        return response()->json([
            'message' => 'Adoption request submitted successfully.',
            'adoption_request' => $adoptionRequest
        ], 201);
    }

    public function index(Request $request)
    {
        $adoptionRequests = AdoptionRequest::where('user_id', $request->user()->id)->with('pet')
        ->latest()
        ->get();

        return response()->json([
            'adoption_requests' => $adoptionRequests
            ]);
    }
    
    public function destroy(Request $request, $id)
    {
        $adoptionRequest = AdoptionRequest::where('id',$id)->where('user_id', $request->user()->id)->firstOrFail();
        if ($adoptionRequest->status !== 'Pending'){
            return response()->json(['message' => 'Only pending adoption requests can be deleted.'], 422);
        }
        $adoptionRequest->delete();

        return response()->json(['message' => 'Adoption request deleted successfully.']);
    }

    public function receivedRequests(Request $request)
    {
        $adoptionRequests = AdoptionRequest::whereHas('pet', function ($query) use ($request) {
            $query->where('user_id', $request->user()->id);
        })
        ->with(['user', 'pet'])
        ->latest()
        ->get();

         return response()->json([
        'adoption_requests' => $adoptionRequests
    ]);
    }

    public function approve(Request $request, $id)
    {
        return DB::transaction(function () use ($request, $id) {

            $adoptionRequest = AdoptionRequest::where('id', $id)
                ->whereHas('pet', function ($query) use ($request) {
                    $query->where('user_id', $request->user()->id);
                })
                ->lockForUpdate()
                ->firstOrFail();

            if ($adoptionRequest->status !== 'Pending') {
                return response()->json([
                    'message' => 'Only pending adoption requests can be approved.'
                ], 422);
            }

            $pet = Pet::where('id', $adoptionRequest->pet_id)
                ->lockForUpdate()
                ->firstOrFail();

            if ($pet->status !== 'available') {
                return response()->json([
                    'message' => 'This pet is no longer available for adoption.'
                ], 422);
            }

            $adoptionRequest->update([
                'status' => 'Approved',
            ]);

            AdoptionRequest::where('pet_id', $pet->id)
                ->where('id', '!=', $adoptionRequest->id)
                ->where('status', 'Pending')
                ->update([
                    'status' => 'Declined',
                ]);

            $pet->update([
                'status' => 'adopted',
            ]);

            return response()->json([
                'message' => 'Adoption request approved successfully.',
                'adoption_request' => $adoptionRequest->fresh(),
                'pet' => $pet->fresh(),
            ]);
        });
    }

    public function decline(Request $request, $id)
    {
        $adoptionRequest = AdoptionRequest::where('id', $id)
            ->whereHas('pet', function ($query) use ($request) {
                $query->where('user_id', $request->user()->id);
            })
            ->firstOrFail();

        if ($adoptionRequest->status !== 'Pending') {
            return response()->json([
                'message' => 'Only pending adoption requests can be declined.'
            ], 422);
        }

        $adoptionRequest->update([
            'status' => 'Declined',
        ]);

        return response()->json([
            'message' => 'Adoption request declined successfully.',
            'adoption_request' => $adoptionRequest->fresh(),
        ]);
    }
}