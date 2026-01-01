@props(['value'])

<label {{ $attributes->merge(['class' => 'form-label']) }}>
    @if(!empty($value))
        {{ $value }}
    @else
        {{ $slot }}
    @endif
</label>