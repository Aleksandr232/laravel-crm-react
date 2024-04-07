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

    public function post_clients_info(Request $request, $id)
    {
        $client = Clients::find($id);

        if (!$client) {
            return response()->json(['error' => 'Клиент не найден'], 404);
        }

        $client->price_service = $request->input('price_service');
        $client->name_service = $request->input('name_service');
        $client->address_service = $request->input('address_service');

        $client->save();

        return response()->json(['success' => 'Дополнительная информация обновлена']);
    }


    public function get_clients()
    {
        $user = Auth::user();
        $clients = $user->clients;

        return response()->json($clients);
    }

    public function wordExport(Request $request, $id)
    {
        setlocale(LC_ALL, 'ru_RU.UTF-8');

        $client = Clients::find($id);

        if ($client->path_doc) {
            Storage::disk('document')->delete($client->path_doc);
        }

        $template = new TemplateProcessor('document/document.docx');
        $template->setValue('id', $client->id);
        $template->setValue('type_work', $client->type_work);
        $template->setValue('price_service', $client->price_service);
        $priceService = $client->price_service;
        $thirtyPercent = $priceService * 0.3;
        $template->setValue('thirty_percent', $thirtyPercent);
        $template->setValue('name_service', $client->name_service);
        $template->setValue('address_service', $client->address_service);
        $date = strftime("%e %B %Y", time());
        $template->setValue('creation_date', $date);

        $user = Auth::user();
        $template->setValue('phone', $user->phone);
        $template->setValue('email', $user->email);
        $template->setValue('company', $user->company);
        $template->setValue('ogrnip', $user->ogrnip);
        $template->setValue('inn', $user->inn);
        $template->setValue('address', $user->address);
        $template->setValue('payment_account', $user->payment_account);
        $template->setValue('correspondent_account', $user->correspondent_account);
        $template->setValue('bank', $user->bank);
        $template->setValue('cod_bik', $user->cod_bik);

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
