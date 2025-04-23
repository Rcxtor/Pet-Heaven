<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title ?? 'Pet Heaven' }}</title>
    <!-- <link rel="stylesheet" href="{{ asset('css/app.css') }}"> -->
    @vite(['resources/css/app.css'])
</head>
<body>
    <header>@include('layouts.navigation')</header>
    <main>
        {{ $slot }} <!-- Dynamic content passed to the component -->
    </main>
    <footer>
        <div class="how-it-work">
            <h1>How It Works</h1>
            <div class="steps">
                <h2>Browse Pets</h2>
                <h2>Contact the Owner</h2>
                <h2>Adopt With Love</h2>
            </div>   
        </div>
        <div class="info-banner">
            <div>
                <h1>Contact Us</h1>
                <p>info@gmail.com</p>
            </div>
            <div>
                <h1>Phone</h1>
                <p>+08801234567</p>
            </div>
            <div class="social-media">
                <a href=""><img src="/images/facebook.png" alt="fb"></a>   <a href=""><img src="/images/inta.png" alt="ins"></a>  <a href=""><img src="/images/twitter.png" alt="tw"></a>  
            </div>
        </div>

    </footer> <!-- Footer: Contact details, social media links, and important links (terms, privacy policy, FAQs). -->
</body>
</html>