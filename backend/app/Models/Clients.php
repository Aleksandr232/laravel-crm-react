<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clients extends Model
{
    use HasFactory;

    protected $table = 'clients';

    protected $fillable = [
        'name',
        'phone',
        'organization',
        'type_work',
        'duration',
        'price_service',
        'name_service',
        'address_service',
        'path_doc',
        'name_doc',
        'act',
        'path_act',
        'service_act',
        'count_act',
        'unit_act',
        'price_act',
        'sum_act',
        'ogrnip_client',
        'inn_client',
        'address_client',
        'payment_account_client',
        'correspondent_account_client',
        'bank_client',
        'cod_bik_client',
        'email_client'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
