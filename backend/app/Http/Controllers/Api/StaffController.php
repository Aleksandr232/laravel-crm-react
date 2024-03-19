<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Staff;
use Illuminate\Http\Request;

class StaffController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function post_staff(Request $request)
    {


        $staff = Staff::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'address'=> $request->address,
            'document'=> $request->document,
            'licence' => $request->licence,
            'file' => $request->file,
        ]);

        $staff->save();

        return response()->json(['success'=>'Cотрудник добавлен']);
    }

    public function delete_staff($id)
    {
        $staff = Staff::find($id);
        $staff->delete();

        return response()->json(['success' => 'Cотрудник удален']);
    }

    public function update_staff(Request $request, $id)
    {
        $staff = Staff::find($id);

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
            $staff->file = $request->file;
        }

        $staff->save();

        return response()->json(['success' => 'Данные сотрудника обновлены']);
    }

    public function get_staff()
    {
        $staff = Staff::all();

        return response()->json($staff);
    }
}
