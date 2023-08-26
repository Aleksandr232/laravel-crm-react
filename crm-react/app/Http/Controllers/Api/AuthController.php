<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {


        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        $userToken = $user->createToken('remember_token')->plainTextToken;
        $user->remember_token = $userToken;
        $user->save();

        return response()->json(['success'=>'Регистрация прошла успешно', 'token' => $userToken]);
    }

    public function login(Request $request)
    {
        $creds = $request->only('email', 'password');

        if(!$token = auth()->attempt($creds)){
            return response()->json(['error' => 'Не удалось авторизоваться', 401]);
        }

        return response()->json([
            'token' => $token,
            'user' => auth()->user()]
        , 200);
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Вы успешно вышли из системы']);
    }

    public function refresh()
    {
        return response()->json([
            'token' => auth()->refresh(),
            'user' => auth()->user()
        ]);
    }

    public function user()
    {
        return response()->json(auth()->user());
    }
}
