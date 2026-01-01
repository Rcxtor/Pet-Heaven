<x-app-layout>
    <form method="POST" action="{{ route('register') }}">
        @csrf

        <!-- Name -->
        <div>
            <x-label for="name" :value="__('Name')" />
            <x-input id="name" type="text" name="name" :value="old('name')" required autofocus autocomplete="name" />
            <x-error :messages="$errors->get('name')" />

        </div>

        <!-- Email Address -->
        <div>
            <x-label for="email" :value="__('Email')" />
            <x-input id="email" type="email" name="email" :value="old('email')" required autocomplete="username" />
            <x-error :messages="$errors->get('email')" />

        </div>

        <!-- Password -->
        <div>
            <x-label for="password" :value="__('Password')" />
            <x-input id="password" type="password" name="password" required autocomplete="new-password" />
            <x-error :messages="$errors->get('password')" />

        </div>

        <!-- Confirm Password -->
        <div>
            <x-label for="password_confirmation" :value="__('Confirm Password')" />
            <x-input id="password_confirmation" type="password" name="password_confirmation" required autocomplete="new-password" />
            <x-error :messages="$errors->get('password_confirmation')"/>        
        </div>

        <div>
            <button type="submit">Register</button>       
            <a href="{{ route('login') }}">Already registered?</a>
        </div>
    </form>
</x-app-layout>
