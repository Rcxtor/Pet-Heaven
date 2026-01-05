<x-app-layout>
    Hello There ALL PETS <br><br>
    @foreach ( $pets as $pet )
        {{ $pet->name }} <br>
        {{ $pet->age }} <br>
        {{ $pet->species }} <br><br>
        {{ $pet->user->name }} <br><br>
        <a href="{{ route('pets.show', ['id' => $pet->id]) }}">View Pet Details</a><br> 
    ----------<br><br>
    @endforeach
</x-app-layout>