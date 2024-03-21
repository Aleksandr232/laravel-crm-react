<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Work;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class WorkController extends Controller
{
    public function post_work(Request $request)
    {
        /* $this->middleware('throttle:10,1')->only('post_work'); */

        $work = new Work([
            'start_work' => $request->start_work,
            'end_work' => $request->end_work,
            'file' => $request->file,
            'path' => $request->path,
            'count_person' => $request->count_person,
            'expenses' => $request->expenses,
            'income' => $request->income,
            'work_type' => $request->work_type,
        ]);

        if($request->hasFile('file')){
            $file = $request->file('file');
            $path = Storage::disk('work')->putFile('file_work', $file);

            $work->file = $file->getClientOriginalName();
            $work->path = $path;
        }

        Auth::user()->work()->save($work);

        // Добавление работы в очередь
       /* ProcessWorkJob::dispatch($work)->delay(now()->addMinutes(5)); */

        return response()->json(['success' => 'Информация добавлена']);
    }

    public function work_delete($id)
    {
        /* $this->middleware('throttle:10,1')->only('work_delete'); */

        $work = Auth::user()->work()->find($id);
        if ($work) {
            $path = $work->path; // Получить путь к файлу сотрудника
            if ($path && Storage::disk('work')->exists($path)) {
                Storage::disk('work')->delete($path); // Удалить файл сотрудника
            }
            $work->delete();
            return response()->json(['success' => 'Информация удалена']);
        } else {
            return response()->json(['error' => 'Информация не найдена'], 404);
        }
    }

    public function get_work()
    {
        

        $user = Auth::user();
        $work = $user->work;

        return response()->json($work); // Возвращаем данные всех работ пользователя
    }
}
