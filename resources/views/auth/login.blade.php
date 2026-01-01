<x-app-layout>
@vite(['resources/css/auth.css'])
    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <form method="POST" action="{{ route('login') }}">
        @csrf

        <!-- Email Address -->
        <div>
            <x-label for="email" :value="__('Email')" />
            <x-input id="email" type="email" name="email" :value="old('email')" required autofocus autocomplete="username" />
            <x-error :messages="$errors->get('email')" />
        </div>

        <!-- Password -->
        <div>
            <x-label for="password" :value="__('Password')" />
            <x-input id="password" type="password" name="password" required autocomplete="current-password" />                      
            <x-error :messages="$errors->get('password')" />
        </div>

        <!-- Remember Me -->
        <div class="display:inline-flex">
            <input id="remember_me" type="checkbox" name="remember">
            <span>{{ __('Remember me') }}</span>
        </div>

        <div>
            <a href="{{ route('password.request') }}">{{ __('Forgot your password?') }}</a>
            <x-primary-button>{{ __('Log in') }}</x-primary-button>
        </div>
    </form>
</x-app-layout>
