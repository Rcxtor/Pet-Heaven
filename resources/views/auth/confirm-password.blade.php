<x-app-layout>
    <h1 >
        {{ __('This is a secure area of the application. Please confirm your password before continuing.') }}
    </h1>

    <form method="POST" action="{{ route('password.confirm') }}">
        @csrf

        <!-- Password -->
        <div>
            <x-label for="password" :value="__('Password')" />

            <x-input id="password" class="block mt-1 w-full"
                            type="password"
                            name="password"
                            required autocomplete="current-password" />

            <x-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <div>
            <x-primary-button>
                {{ __('Confirm') }}
            </x-primary-button>
        </div>
    </form>
</x-app-layout>
