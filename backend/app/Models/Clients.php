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
        'name_doc'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
