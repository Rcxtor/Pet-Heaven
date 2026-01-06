<x-app-layout title="{{ $pet->name }} || Pet Heaven">
    Hello There <br><br>
    <img src="{{ asset('storage/images/' . $pet->image) }}" alt="{{ $pet->species }}'s image"> <br><br>
    {{ $pet->name }}<br><br>
    {{ $pet->id }}<br><br>

    <h1>{{__('Owner: :name', ['name' => $pet->user->name])}}</h1>
    <h1>{{ __('Age: :age', ['age' => $pet->age]) }}</h1>
    <h1>{{ __('Species: :species', ['species' => $pet->species]) }}</h1>
    <h1>{{ __('Gender: :gender', ['gender' => $pet->gender]) }}</h1>
    <h1>{{ __('Location: :location', ['location' => $pet->location]) }}</h1>
    <h1>{{ __('Description: :description', ['description' => $pet->description]) }}</h1>
    <x-link-button href="{{ route('adoption.form', $pet) }}">{{ __('Apply For Adoption') }}</x-link-button>
</x-app-layout>