<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class StaffController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function post_staff(Request $request)
    {
        $user = Auth::user();

        $staff = Staff::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'address'=> $request->address,
            'document'=> $request->document,
            'licence' => $request->licence,
        ]);

        if($request->hasFile('file')){
            $file = $request->file('file');
            $path = Storage::disk('file_staff')->putFile('file', $file);

            $staff->file = $file->getClientOriginalName();
            $staff->path = $path;

        }

        $user->staff()->save($staff);

        return response()->json(['success'=>'Cотрудник добавлен']);
    }

    public function delete_staff($id)
    {
        $staff = Auth::user()->staff()->find($id); // Найти сотрудника только в списке сотрудников текущего пользователя
        if ($staff) {
            $staff->delete(); // Удалить сотрудника
            return response()->json(['success' => 'Cотрудник удален']);
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

        if($staff->path){
            Storage::disk('file_staff')->delete($staff->path);
        }


        if($request->hasFile('file')){
            $file = $request->file('file');
            $path = Storage::disk('file_staff')->putFile('file', $file);

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
