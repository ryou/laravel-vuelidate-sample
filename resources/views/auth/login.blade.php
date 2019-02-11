@extends('layouts.app')

@section('content')
<div id="app">
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Login</div>

                    <div class="panel-body">
                        <login-form action="{{ route('login') }}" forget-link="{{ route('password.request') }}"></login-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('page-js')
<script src="{{ asset('assets/js/login.js') }}"></script>
@endsection
