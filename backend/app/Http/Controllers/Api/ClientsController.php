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

        if ($client->path_doc) {
            Storage::disk('document')->delete($client->path_doc);
        }

        $template = new TemplateProcessor('document/document.docx');
        $template->setValue('id', $client->id);

        $user = Auth::user();
        $template->setValue('phone', $user->phone);
        $template->setValue('email', $user->email);
        $template->setValue('company', $user->company);

        $name_doc = $client->name . '.docx';  // Название файла

        $path_doc = Storage::disk('document')->putFile('document_clients', $template->save());  // Сохраняем файл в хранилище

        $client->name_doc = $name_doc;  // Сохраняем название файла в базе данных
        $client->path_doc = $path_doc;  // Сохраняем путь файла в базе данных

        $user->clients()->save($client);

        return response()->json(['message' => 'Файл успешно создан']);
    }

    public function delete_client($id)
    {
        $client = Auth::user()->clients()->find($id);
        if ($client) {
            $path_doc = $client->path_doc; // Получить путь к файлу сотрудника
            if ($path_doc && Storage::disk('document')->exists($path_doc)) {
                Storage::disk('document')->delete($path_doc); // Удалить файл сотрудника
            }
            $client->delete();
            return response()->json(['success' => 'Клиент и файл удалены']);
        } else {
            return response()->json(['error' => 'Клиент не найден'], 404);
        }
    }



}
