<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\StaffController;
use App\Http\Controllers\Api\WorkController;
use App\Http\Controllers\Api\CalendarController;

/*
|--------------------------------------------------------------------------
| API Route
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/auth', [AuthController::class, 'redirectToAuth']);
Route::get('/auth/callback', [AuthController::class, 'handleAuthCallback']);
Route::get('/redirect-to-yandex-auth', [AuthController::class, 'redirectToYandexAuth']);
Route::get('/handle-yandex-auth-callback', [AuthController::class, 'handleYandexAuthCallback']);

// Защищенные маршруты, требующие авторизации
Route::middleware('auth:sanctum')->group(function(){
    //dashboard
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/calendar/work', [CalendarController::class, 'get_calendar_work']);
        Route::middleware('admin')->group(function(){
            //staff
            Route::post('/staff', [StaffController::class, 'post_staff']);
            Route::put('/staff_update/{id}', [StaffController::class, 'update_staff']);
            Route::get('/staff/all', [StaffController::class, 'get_staff']);
            Route::delete('/staff/{id}', [StaffController::class, 'delete_staff']);
            //work
            Route::post('/work', [WorkController::class, 'post_work']);
            Route::delete('/work/{id}', [WorkController::class, 'work_delete']);
            Route::get('/work/all', [WorkController::class, 'get_work']);
            //calendar
            Route::post('/calendar', [CalendarController::class, 'post_calendar']);
            Route::get('/calendar/all', [CalendarController::class, 'get_calendar']);
        });
});


