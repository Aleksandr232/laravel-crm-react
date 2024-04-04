<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Clients;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PhpOffice\PhpWord\TemplateProcessor;
use Illuminate\Support\Facades\Storage;

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

    public function wordExport(Request $request, $id)
    {
        $client = Clients::find($id);
        $template = new TemplateProcessor('document/document.docx');
        $template->setValue('name', $client->name);

        $name_doc = $client->name . '.docx';  // Название файла

        $path_doc = Storage::disk('document')->putFile('document_clients', $template->save());  // Сохраняем файл в хранилище

        $client->name_doc = $name_doc;  // Сохраняем название файла в базе данных
        $client->path_doc = $path_doc;  // Сохраняем путь файла в базе данных

        Auth::user()->clients()->save($client);

        return response()->json(['message' => 'Файл успешно создан']);
    }



}
