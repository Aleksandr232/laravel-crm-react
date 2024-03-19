<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    use HasFactory;

    protected $table = 'staff';

    protected $fillable = [
        'name',
        'phone',
        'address',
        'document',
        'licence',
        'file',
        'path'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }


}
