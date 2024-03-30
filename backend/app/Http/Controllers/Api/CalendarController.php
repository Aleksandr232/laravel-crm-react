<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Calendar;
use App\Models\User;

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

    public function get_calendar_work()
    {
        $calendars = User::all()->pluck('calendar');

        return response()->json($calendars);
    }

    public function post_calendar_work(Request $request, $id)
    {
        $user = Auth::user();

        $calendar = Calendar::find($id);

        if($calendar) {
            $userNames = $calendar->name ? json_decode($calendar->name, true) : [];
            $userNames[] = $user->name;
            $calendar->name = json_encode($userNames);
            $calendar->save();

            return response()->json(['success' => $user->name . ' записался на работу']);
        } else {
            return response()->json(['error' => 'Запись в календаре не найдена']);
        }
    }
}
