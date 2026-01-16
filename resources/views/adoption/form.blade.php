<x-app-layout>
    <h1>Adoption Form</h1>
    
    <form method="post" action="{{route('adoption.submit')}}">
        @csrf
        <input type="hidden" name="pet_id" value="{{ $pet->id }}">
        <input type="hidden" name="user_id" value="{{ Auth::user()->id }}">
        {{ $pet->id }}
        <x-label for="name">{{ __('Full Name') }}</x-label>
        <x-input id="name" type="text" name="name" :value="old('name', Auth::user()->name)" required autofocus />
        <br><br>
        <x-label for="email">{{ __('Email Address') }}</x-label>
        <x-input id="email" type="email" name="email" :value="old('email', Auth::user()->email)" required />
        <br><br>
        <x-label for="phone">{{ __('Phone Number') }}</x-label>
        <x-input id="phone" type="number" name="phone" :value="old('phone', Auth::user()->phone)" required />
        <br><br>
        <x-label for="exp">{{ __('Experience with pets') }}</x-label>
        <input id='exp' type="radio" name="exp" value="yes">{{ __('Yes') }}</input> 
        <input id='exp' type="radio" name="exp" value="no"> {{ __('No') }}</input>
        <br><br>
        <x-label for="reason">{{ __('Reason for Adoption') }}</x-label><br>
        <textarea id="reason" name="reason" rows="4" cols="50"  placeholder="Give A Reason For Adoption"></textarea>
        <br><br>
        <x-label for="address">{{ __('Address') }}</x-label>
        <x-input id="address" type="text" name="address" :value="old('address', 'NA')" required />
        <br><br>
        
        <x-primary-button type="submit">{{ __('Submit Application') }}</x-primary-button>
    </form>
</x-app-layout>


<!-- need to add ❌ Owner cannot apply for their own pet

❌ User can apply only once per pet

🛡️ Admin approves / rejects

🔒 Pet becomes unavailable after approval -->