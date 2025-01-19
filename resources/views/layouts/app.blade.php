<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title ?? 'Pet Heaven' }}</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body>
    <header>@include('layouts.navigation')</header>
    <main>
        {{ $slot }} <!-- Dynamic content passed to the component -->
    </main>
    <footer>Footer Content</footer> <!-- Footer: Contact details, social media links, and important links (terms, privacy policy, FAQs). -->
</body>
</html>