<x-app-layout title="Create Pet | Pet Heaven">
    <h1 class="create-pet-heading">{{ __('Create a New Pet Listing') }}</h1>

    <form action="{{ route('pets.store') }}" method="POST" class="create-pet-form">
        @csrf
        <div>
            <x-label for="name" :value="__('Pet Name:')"/>
            <input type="text" id="name" name="name" :value="old('name')" required>
        </div>
        <div>
            <x-label for="species" :value="__('Pet Type:')"/>
            <input type="text" id="species" name="species" :value="old('species')" required>
        </div>
        <div>
            <x-label for="breed" :value="__('Breed:')"/>
            <input type="text" id="breed" name="breed" :value="old('breed')" required>
        </div>
        <div>
            <x-label for="age" :value="__('Age:')"/>
            <input type="number" id="age" name="age" :value="old('age')" required>
        </div>
        <div>
            <x-label for="size" :value="__('Size:')"/>
            <select id="size" name="size" required>
                <option value="" disabled selected>Select a size</option>
                <option value="small">{{ __('Small') }}</option>
                <option value="medium">{{ __('Medium') }}</option>
                <option value="large">{{ __('Large') }}</option>
            </select>
        </div>
        <div>
            <x-label for="gender" :value="__('Gender:')"/>
            <select id="gender" name="gender" required>
                <option value="" disabled selected>Select a gender</option>
                <option value="male">{{ __('Male') }}</option>
                <option value="female">{{ __('Female') }}</option>
            </select>
        </div>
        <div>
            <x-label for="description" :value="__('Description:')"/>
            <textarea id="description" name="description" :value="old('description')" ></textarea>
        </div>
        <div>
            <x-label for="image" :value="__('Pet Image:')"/>
            <input type="file" id="image" name="image" accept="image/*">
        </div>
        <x-primary-button>{{ __('Create Listing') }}</x-primary-button>
    </form>
    
</x-app-layout>
