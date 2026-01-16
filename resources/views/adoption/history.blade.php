<x-app-layout>

@foreach ( $adoption_requests as $adoption_request )
    {{ $adoption_request ->id }} <br>
    {{ $adoption_request ->pet->name}} <br>
    {{ $adoption_request ->pet->species }} <br>
    {{ $adoption_request ->pet->user->name}} <br>
    {{ $adoption_request ->pet->location}} <br>
    <a href="{{route('adoption.pending',[$adoption_request])}}">{{ __('View Details') }}</a><br> <br>

@endforeach

</x-app-layout><div>
 
