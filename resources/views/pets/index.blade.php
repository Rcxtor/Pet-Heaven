<x-app-layout>
    Hello There <br><br>
    @foreach ( $pets as $pet )  
        {{ $pet->name }} <br>
        {{ $pet->age }} <br>
        {{ $pet->species }} <br><br>
        {{ $pet->user->name }} <br><br>
    
    @endforeach
</x-app-layout>