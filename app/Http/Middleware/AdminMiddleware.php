<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
{
    // Check if the user is authenticated and has admin role
    if (Auth::check() && Auth::user()->role === 'admin') {
        return $next($request); // Let them pass
    }

    // If not, block them
    abort(403, 'Unauthorized access.');
}
}
