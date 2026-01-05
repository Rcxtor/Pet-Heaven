<x-app-layout title="{{ $pet->name }} || Pet Heaven">
    Hello There <br><br>
    {{ $pet->name }}

    <!-- need to add the href and text option in the document -->
    <!-- <x-primary-button href="{{ route('pets.show', ['id' => $pet->id]) }}">{{__('ready to adopt')}}</x-primary-button> -->
</x-app-layout>