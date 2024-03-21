<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Work extends Model
{
    use HasFactory;

    protected $table = 'work';

    protected $fillable = [
        'start_work',
        'end_work',
        'file',
        'path',
        'count_person',
        'expenses',
        'income',
        'work_type'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
