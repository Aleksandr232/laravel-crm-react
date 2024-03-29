<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    use HasFactory;

    protected $table = 'calendar';

    protected $fillable = [
        'day_work',
        'work_des'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}


