<?php

namespace App\Http\Controllers;
use App\Models\pet;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\AdoptionRequest;

class AdoptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // dd($adoption_requests);
        $adoption_requests = AdoptionRequest::where('user_id',Auth::id())->get();

        // dd($adoption_requests);
        // return view('adoption.history');
        return view('adoption.history',compact('adoption_requests'));
    }   

    /**
     * Show the form for creating a new resource.
     */
    public function create(Pet $pet)
    {
        return view('adoption.form', compact('pet'));

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd(Auth::id());
        // dd(Pet::find($request->pet_id));
        $request->validate([
            'pet_id' => 'required|exists:pets,id', 
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255',
            'address' => 'nullable|string|max:255',
            'phone' => 'required|digits:11',
            'exp' => 'required|in:yes,no',
            'reason' => 'nullable|string',
        ]);
        // dd($request->email);

        $adoption_request = AdoptionRequest::create([
            'user_id' => Auth::id(),       
            'pet_id' => $request->pet_id,  
            'name' => $request->name,
            'email' => $request->email,
            'address' => $request->address,
            'phone' => $request->phone,
            'exp' => $request->exp,
            'reason' => $request->reason,
        ]);
        // dd($adoption_request);

        // return redirect()->route('adoption.pending', ['id' => $adoption_request->id]);
        return redirect()->route('adoption.pending', [$adoption_request]);
        // need to update the adoption applications table
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        {
        $adoption_request = AdoptionRequest::findOrFail($id);

        if ($adoption_request->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action. You cannot view this request.');
        }
        return view('adoption.pending', compact('adoption_request'));

    }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}


