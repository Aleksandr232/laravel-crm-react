<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Http\JsonResponse;
use Laravel\Socialite\Contracts\User as SocialiteUser;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;

class AuthController extends Controller
{

        public function redirectToAuth(): JsonResponse
    {
        return response()->json([
            'url' => Socialite::driver('google')
                            ->stateless()
                            ->redirect()
                            ->getTargetUrl(),
        ]);
    }

    public function handleAuthCallback(): JsonResponse
    {
        try {
            $socialiteUser = Socialite::driver('google')->stateless()->user();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid credentials provided.'], 422);
        }

        $user = User::firstOrCreate(
            ['email' => $socialiteUser->getEmail()],
            [
                'email_verified_at' => now(),
                'name' => $socialiteUser->getName(),
                'google_id' => $socialiteUser->getId(),
                'avatar' => $socialiteUser->getAvatar(),

            ]
        );

        $userToken = $user->createToken('google-token')->plainTextToken;
        $user->remember_token = $userToken;
        $user->save();

        return response()->json([
            'user' => $user,
            'access_token' => $userToken,
            'token_type' => 'Bearer',
        ]);
    }

        public function redirectToYandexAuth(): JsonResponse
    {
        return response()->json([
            'url' => Socialite::driver('yandex')
                            ->stateless()
                            ->redirect()
                            ->getTargetUrl(),
        ]);
    }

    public function handleYandexAuthCallback(): JsonResponse
    {
        try {
            $socialiteUser = Socialite::driver('yandex')->stateless()->user();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid credentials provided.'], 422);
        }

        $user = User::firstOrCreate(
            ['email' => $socialiteUser->getEmail()],
            [
                'email_verified_at' => now(),
                'name' => $socialiteUser->getName(),
                'yandex_id' => $socialiteUser->getId(),
                'avatar' => $socialiteUser->getAvatar(),
            ]
        );

        $userToken = $user->createToken('yandex-token')->plainTextToken;
        $user->remember_token = $userToken;
        $user->save();

        return response()->json([
            'user' => $user,
            'access_token' => $userToken,
            'token_type' => 'Bearer',
        ]);
    }

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
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $userToken = $user->createToken('auth_token')->plainTextToken;
            $user->remember_token = $userToken;
            $user->save();

            return response()->json(['success' => 'Авторизация прошла успешно', 'token' => $userToken]);
        } else {
            return response()->json(['error' => 'Ошибка аутентификации'], 401);
        }
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
