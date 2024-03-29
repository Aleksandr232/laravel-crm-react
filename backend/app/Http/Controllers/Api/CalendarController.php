<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Calendar;

class CalendarController extends Controller
{
    public function post_calendar(Request $request)
    {
        $calendar = new Calendar([
            'day_work'=>$request->day_work,
            'work_des'=>$request->work_des
        ]);



        Auth::user()->calendar()->save($calendar);


        return response()->json(['success' => 'Выбран день работы!']);
    }

    public function get_calendar()
    {

        $user = Auth::user();
        $calendar = $user->calendar;

        return response()->json($calendar); // Возвращаем данные всех работ пользователя
    }
}
