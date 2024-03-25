<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Event;
use App\Events\WebSocketStaff;


class StaffController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function post_staff(Request $request)
    {
        $staff = new Staff([
            'name' => $request->name,
            'phone' => $request->phone,
            'address' => $request->address,
            'document' => $request->document,
            'licence' => $request->licence,
        ]);

        if($request->hasFile('file')){
            $file = $request->file('file');
            $path = Storage::disk('file_staff')->putFile('file', $file);

            $staff->file = $file->getClientOriginalName();
            $staff->path = $path;
        }

        $message = Auth::user()->staff()->save($staff);

        $wesocket =  event(new WebSocketStaff($message));

        return response()->json(['success' => 'Cотрудник добавлен']);
    }

    public function delete_staff($id)
    {
        $staff = Auth::user()->staff()->find($id);
        if ($staff) {
            $path = $staff->path; // Получить путь к файлу сотрудника
            if ($path && Storage::disk('file_staff')->exists($path)) {
                Storage::disk('file_staff')->delete($path); // Удалить файл сотрудника
            }
            $staff->delete();
            return response()->json(['success' => 'Cотрудник и связанный файл удалены']);
        } else {
            return response()->json(['error' => 'Cотрудник не найден или не принадлежит текущему пользователю'], 404);
        }
    }

    public function update_staff($id, Request $request)
    {
        $staff = Auth::user()->staff()->find($id);

        if (!$staff) {
            return response()->json(['error' => 'Сотрудник не найден'], 404);
        }

        if ($request->has('name')) {
            $staff->name = $request->name;
        }

        if ($request->has('phone')) {
            $staff->phone = $request->phone;
        }

        if ($request->has('address')) {
            $staff->address = $request->address;
        }

        if ($request->has('document')) {
            $staff->document = $request->document;
        }

        if ($request->has('licence')) {
            $staff->licence = $request->licence;
        }

        if ($request->hasFile('file')) {
            if($staff->path){
                Storage::disk('file_staff')->delete($staff->path);
            }
            $file = $request->file('file');
            $path = $file->store('file', 'file_staff');

            $staff->file = $file->getClientOriginalName();
            $staff->path = $path;
        }

        $staff->save();

        return response()->json(['success' => 'Данные сотрудника обновлены']);
    }


    public function get_staff()
    {
        $user = Auth::user();
        $staff = $user->staff;

        return response()->json($staff);
    }
}
