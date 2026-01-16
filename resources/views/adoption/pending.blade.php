<x-app-layout>
<div>
    <h1>
        {{ __('Adoption Status: :status', ['status' => $adoption_request->status]) }}
    </h1>
    <br>
    Pet Name:  {{ $adoption_request->pet->name }}
    <br>
    Pet: {{ $adoption_request->pet->species }} <br>
    Breed: {{ $adoption_request->pet->breed }} <br>
    Owner: {{ $adoption_request->pet->user->name }} <br>
    Location: {{ $adoption_request->pet->location}} <br><br>

    @if ($adoption_request->status == 'Approved')
    <h1>Contact the Pet Owner</h1>
    Owner Phone Number: {{ $adoption_request->pet->user->phone ??  'NO NUMBER AVAILABLE'}}<br>
    Owner Email: {{ $adoption_request->pet->user->email}}
    @elseif($adoption_request->status == 'Pending')
    <h1>Please wait for approval</h1>
    @else
    <h1>Sorry your request has been denied</h1>
    @endif
    


</div>
</x-app-layout>

<h1><span></span></h1>