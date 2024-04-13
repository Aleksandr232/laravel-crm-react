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
        $client = Auth::user()->clients()->find($id);

        if (!$client) {
            return response()->json(['error' => 'Клиент не найден'], 404);
        }

        $client->price_service = $request->input('price_service');
        $client->name_service = $request->input('name_service');
        $client->address_service = $request->input('address_service');

        $client->save();

        return response()->json(['success' => 'Дополнительная информация обновлена']);
    }


    public function get_clients(Request $request)
    {
        $user = Auth::user();
        $searchTerm = $request->input('searchTerm');

        if (!empty($searchTerm)) {
            $clients = $user->clients()->where('name', 'like', '%'.$searchTerm.'%')->get();
        } else {
            $clients = $user->clients;
        }

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
        $template->setValue('type_work', $client->type_work);
        $template->setValue('price_service', $client->price_service);
        $priceService = $client->price_service;
        $thirtyPercent = $priceService * 0.3;
        $template->setValue('thirty_percent', $thirtyPercent);
        $template->setValue('name_service', $client->name_service);
        $template->setValue('address_service', $client->address_service);
        setlocale(LC_TIME, 'ru_RU.UTF-8');
        $date = strftime("%e %B %Y", time());
        $template->setValue('creation_date', $date);

        $client->ogrnip_client = $request->input('ogrnip_client');
        $client->address_client = $request->input('address_client');
        $client->payment_account_client = $request->input('payment_account_client');
        $client->correspondent_account_client = $request->input('correspondent_account_client');
        $client->bank_client = $request->input('bank_client');
        $client->cod_bik_client = $request->input('cod_bik_client');
        $client->inn_client = $request->input('inn_client');
        $client->email_client = $request->input('email_client');


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
        $template->setValue('organization', $client->organization);
        $template->setValue('phone_client', $client->phone);
        $template->setValue('email_client', $client->email_client);
        $template->setValue('ogrnip_client', $client->ogrnip_client);
        $template->setValue('inn_client', $client->inn_client);
        $template->setValue('address_client', $client->address_client);
        $template->setValue('payment_account_client', $client->payment_account_client);
        $template->setValue('correspondent_account_client', $client->correspondent_account_client);
        $template->setValue('bank_client', $client->bank_client);
        $template->setValue('cod_bik_client', $client->cod_bik_client);


        $name_doc = $client->name . '.docx';  // Название файла

        $path_doc = Storage::disk('document')->putFileAs('document_clients', $template->save(), $name_doc);   // Сохраняем файл в хранилище

        $client->name_doc = $name_doc;  // Сохраняем название файла в базе данных
        $client->path_doc = $path_doc;  // Сохраняем путь файла в базе данных

        $user->clients()->save($client);

        return response()->json(['message' => 'Файл успешно создан']);
    }



    public function delete_client($id)
    {
        $client = Auth::user()->clients()->find($id);
        if ($client) {
            $path_doc = $client->path_doc;
            $path_act = $client->path_act;
            if ($path_doc && Storage::disk('document')->exists($path_doc)) {
                Storage::disk('document')->delete($path_doc); // Удалить файл сотрудника
            }else if ($path_act && Storage::disk('document')->exists($path_act)){
                Storage::disk('document')->delete($path_act);
            }
            $client->delete();
            return response()->json(['success' => 'Клиент и файл удалены']);
        } else {
            return response()->json(['error' => 'Клиент не найден'], 404);
        }
    }

    public function post_clients_act(Request $request, $id)
    {
        $client = Auth::user()->clients()->find($id);

        if ($client->path_act) {
            Storage::disk('document')->delete($client->path_act);
        }

        $template = new TemplateProcessor('document/act.docx');
        $template->setValue('id', $client->id);
        $template->setValue('organization', $client->organization);
        setlocale(LC_TIME, 'ru_RU.UTF-8');
        $date = strftime("%e %B %Y", time());
        $template->setValue('creation_date', $date);

        $client->act = $client->id;
        $client->service_act = $request->input('service_act');
        $client->count_act = $request->input('count_act');
        $client->unit_act = $request->input('unit_act');
        $client->price_act = $request->input('price_act');
        $client->sum_act = $request->input('sum_act');


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
        $template->setValue('service_act', $client->service_act);
        $template->setValue('count_act', $client->count_act);
        $template->setValue('unit_act',  $client->unit_act);
        $template->setValue('price_act', $client->price_act);
        $template->setValue('sum_act', $client->sum_act);
        $template->setValue('address', $user->address);
        $template->setValue('phone_client', $client->phone);
        $template->setValue('ogrnip_client', $client->ogrnip_client);
        $template->setValue('inn_client', $client->inn_client);
        $template->setValue('address_client', $client->address_client);
        $template->setValue('payment_account_client', $client->payment_account_client);
        $template->setValue('correspondent_account_client', $client->correspondent_account_client);
        $template->setValue('bank_client', $client->bank_client);
        $template->setValue('cod_bik_client', $client->cod_bik_client);
        $template->setValue('email_client', $client->email_client);

        $id_act = 'Акт' . $client->id . '.docx';
        $path_act = Storage::disk('document')->putFileAs('act_clients', $template->save(), $id_act);
        $client->path_act = $path_act;
        $user->clients()->save($client);

        return response()->json(['success' => 'Акт добавлен']);
    }



}
