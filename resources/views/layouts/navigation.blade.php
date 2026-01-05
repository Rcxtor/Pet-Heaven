<nav>
    <!-- home, browse pet, post a pet, contact, login/reg, dashboard(for admin)-->
    <div class="nav-logo">
        <a href="{{route("welcome")}}"> <img src="/images/logo.png" alt="Logo"></a>
    </div>
    <div class="nav-search">
        <input placeholder="Find Your Pal..." id="input" class="nav-search-input" name="text" type="text">
        <button class="nav-search-button">&#128269;</button>
    </div>
    <div class="nav-link">
        <a href="{{route("welcome")}}">Home</a>
        <a href="{{ route('pets.index') }}">Browse Pet</a>
        <a href="#">Contact</a>
        <a href="{{ route('pets.create') }}">Post A Pet</a>
    </div>    
    <div class="auth-link">
        <a id="auth-toggle">☰</a>
        <div class="auth-link-dropdown" id="auth-dropdown">
        @if (Route::has('login'))
            @auth
                <a href="{{route('profile.edit') }}">Profile</a>
                <a href="{{ route('dashboard') }}">Dashboard</a>
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <a href="{{route('logout')}}" onclick="event.preventDefault();
                                        this.closest('form').submit();">Logout</a>
                </form>


            @else
                <a href="{{ route('login') }}" >Log in</a> 
                                                        
                    
                

                @if (Route::has('register'))
                    <a href="{{ route('register') }}">Register</a>
                @endif
            @endauth 
        @endif
        </div>
        
    </div>
                            
</nav>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        const toggleBtn = document.getElementById('auth-toggle');
        const dropdown = document.getElementById('auth-dropdown');

        toggleBtn.addEventListener('click', function () {
            dropdown.classList.toggle('show');
        });

        // Optional: Hide dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!toggleBtn.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
    });
</script>