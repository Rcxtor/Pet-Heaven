<nav>
    <!-- home, browse pet, post a pet, contact, login/reg, dashboard(for admin)-->
    <div class="nav-logo">
        <a href="{{route("welcome")}}"> <img src="/images/logo.png" alt="Logo"></a>
    </div>
    <div class="nav-link">
        <a href="{{route("welcome")}}">Home</a>
        <a href="">Browse Pet</a>
        <a href="">Contact</a>
    </div>
    <div class="nav-search">
        <input placeholder="Search.." id="input" class="nav-search-input" name="text" type="text">
        <button class="nav-search-button">&#128269;</button>
    </div>
    <div class="post-link">
        <a href="">Post A Pet</a>
    </div>
    
    <div class="auth-link">
        <!-- <a href="">Login</a>
        <a href="">Register</a>
        <a href="">Dashboard</a> -->
        @if (Route::has('login'))
            @auth
                <a href="{{route('profile.edit') }}">Profile</a>
                <a href="{{ url('/dashboard') }}">Dashboard</a>
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <a href="{{route('logout')}}" onclick="event.preventDefault();
                                        this.closest('form').submit();">logout</a>
                </form>


            @else
                <a href="{{ route('login') }}" >Log in</a> 
                                                        
                    
                

                @if (Route::has('register'))
                    <a href="{{ route('register') }}">Register</a>
                @endif
            @endauth
        @endif
    </div>
                            
</nav>
