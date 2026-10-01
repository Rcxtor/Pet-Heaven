<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AdoptionRequest;
use App\Models\Pet;
use App\Models\AdoptionHistory;
use Illuminate\Support\Facades\DB;

class AdoptionRequestController extends Controller
{
    public function checkProfile(Request $request)
    {
        $user = $request->user();

        if (empty($user->phone) || empty($user->city)) {
            return response()->json([
                'complete' => false,
                'message' => 'Please fill up all the information.'
            ], 422);
        }

        return response()->json([
            'complete' => true
        ]);
    }
    public function store(Request $request)
    {

        $validated = $request->validate([
            'pet_id' => 'required|exists:pets,id',
            'exp' => 'required|in:yes,no',
            'reason' => 'nullable|string',
        ]);


        $pet = Pet::findOrFail($request->pet_id);

        if ($pet->status !== 'available') {
            return response()->json([
                'message' => 'This pet is no longer available for adoption.'
            ], 422);
        }


        $user = $request->user();

        if (empty($user->phone) || empty($user->city)) {
            return response()->json([
                'message' => 'Please complete your profile with your phone number and city before applying for adoption.'
            ], 422);
        }

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
        $adoptionRequests = AdoptionRequest::where('user_id', $request->user()->id)->with(['pet.user'])
        ->latest()
        ->get();

        return response()->json([
            'adoption_requests' => $adoptionRequests
            ]);
    }
    
    public function cancel(Request $request, $id)
    {
        $adoptionRequest = AdoptionRequest::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        if ($adoptionRequest->status !== 'Pending') {
            return response()->json([
                'message' => 'Only pending adoption requests can be cancelled.'
            ], 422);
        }

        $adoptionRequest->update([
            'status' => 'Cancelled',
        ]);

        return response()->json([
            'message' => 'Adoption request cancelled successfully.',
            'adoption_request' => $adoptionRequest->fresh(),
        ]);
    }

    // public function destroy(Request $request, $id)
    // {
    //     $adoptionRequest = AdoptionRequest::where('id',$id)->where('user_id', $request->user()->id)->firstOrFail();
    //     if ($adoptionRequest->status !== 'Pending'){
    //         return response()->json(['message' => 'Only pending adoption requests can be deleted.'], 422);
    //     }
    //     $adoptionRequest->delete();

    //     return response()->json(['message' => 'Adoption request deleted successfully.']);
    // }

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

     public function select(Request $request, $id)
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
                    'message' => 'Only pending adoption requests can be selected.'
                ], 422);
            }

            // Lock the pet
            $pet = Pet::where('id', $adoptionRequest->pet_id)
                ->lockForUpdate()
                ->firstOrFail();

            // Pet must still be available
            if ($pet->status !== 'available') {
                return response()->json([
                    'message' => 'This pet is no longer available for adoption.'
                ], 422);
            }

            // Select applicant
            $adoptionRequest->update([
                'status' => 'Selected',
            ]);

            // Put pet into adoption process
            $pet->update([
                'status' => 'pending_adoption',
            ]);

            return response()->json([
                'message' => 'Applicant selected successfully.',
                'adoption_request' => $adoptionRequest->fresh(),
                'pet' => $pet->fresh(),
            ]);
        });
    }

     // Owner cancels the selected applicant
    public function cancelSelection(Request $request, $id)
    {
        return DB::transaction(function () use ($request, $id) {

            $adoptionRequest = AdoptionRequest::where('id', $id)
                ->whereHas('pet', function ($query) use ($request) {
                    $query->where('user_id', $request->user()->id);
                })
                ->lockForUpdate()
                ->firstOrFail();

            // Only selected requests can be cancelled this way
            if ($adoptionRequest->status !== 'Selected') {
                return response()->json([
                    'message' => 'Only selected adoption requests can be cancelled.'
                ], 422);
            }

            // Lock the pet
            $pet = Pet::where('id', $adoptionRequest->pet_id)
                ->lockForUpdate()
                ->firstOrFail();

            // Cancel selection
            $adoptionRequest->update([
                'status' => 'Cancelled',
            ]);

            // Make pet available again
            $pet->update([
                'status' => 'available',
            ]);

            return response()->json([
                'message' => 'Adoption selection cancelled.',
                'adoption_request' => $adoptionRequest->fresh(),
                'pet' => $pet->fresh(),
            ]);
        });
    }

    public function complete(Request $request, $id)
    {
        return DB::transaction(function () use ($request, $id) {

            $adoptionRequest = AdoptionRequest::where('id', $id)
                ->whereHas('pet', function ($query) use ($request) {
                    $query->where('user_id', $request->user()->id);
                })
                ->lockForUpdate()
                ->firstOrFail();

            // Only selected requests can be completed
            if ($adoptionRequest->status !== 'Selected') {
                return response()->json([
                    'message' => 'Only selected adoption requests can be completed.'
                ], 422);
            }

            // Lock the pet
            $pet = Pet::where('id', $adoptionRequest->pet_id)
                ->lockForUpdate()
                ->firstOrFail();

            // Pet must be in an adoption process
            if ($pet->status !== 'pending_adoption') {
                return response()->json([
                    'message' => 'This pet is not currently in an adoption process.'
                ], 422);
            }

            // Complete selected request
            $adoptionRequest->update([
                'status' => 'Completed',
            ]);

            // Decline all other pending requests
            AdoptionRequest::where('pet_id', $pet->id)
                ->where('id', '!=', $adoptionRequest->id)
                ->where('status', 'Pending')
                ->update([
                    'status' => 'Declined',
                ]);

            // Mark pet as adopted
            $pet->update([
                'status' => 'adopted',
            ]);

             AdoptionHistory::create([
                'user_id' => $adoptionRequest->user_id,
                'pet_id' => $adoptionRequest->pet_id,
                'adoption_request_id' => $adoptionRequest->id,
                'adoption_date' => now()->toDateString(),
            ]);
            return response()->json([
                'message' => 'Adoption completed successfully.',
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
    public function receivedRequest(Request $request, $id)
    {
        $adoptionRequest = AdoptionRequest::where('id', $id)
            ->whereHas('pet', function ($query) use ($request) {
                $query->where('user_id', $request->user()->id);
            })
            ->with(['user', 'pet'])
            ->firstOrFail();

        return response()->json([
            'adoption_request' => $adoptionRequest
        ]);
    }
}