<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('/users', function (Request $request) {

    $users = App\User::all('id', 'name', 'email');
    return $users;
});

Route::middleware('auth:api')->get('/user/{id}', function ($id) {
    $user = App\User::find($id);
    if (!$user) {
        throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException('User not found');
    }
    return $user;
});