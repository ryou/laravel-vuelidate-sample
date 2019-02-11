<?php

namespace App\Http\Middleware;

use Closure;

class ForceHttpsProtocol
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!$request->secure() && config('APP_ENV') === 'production')
        {
            return redirect()->secure($request->getRequestUri());
        }

        return $next($request);
    }
}
