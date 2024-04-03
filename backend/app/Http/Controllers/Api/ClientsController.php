<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Clients;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClientsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function post_clients(Request $request)
    {
        $client = new Clients([
            'name' => $request->name,
            'phone' => $request->phone,
            'organization' => $request->organization,
            'type_work' => $request->type_work,
            'duration' => $request->duration,

        ]);

        Auth::user()->clients()->save($client);

        return response()->json(['success' => 'Клиент добавлен']);
    }


    public function get_clients()
    {
        $user = Auth::user();
        $clients = $user->clients;

        return response()->json($clients);
    }

}
