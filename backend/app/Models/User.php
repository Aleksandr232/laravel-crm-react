<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable

{
    use HasApiTokens, HasFactory, Notifiable;



    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'email_verified_at',
        'password',
        'company',
        'ogrnip',
        'inn',
        'address',
        'payment_account',
        'correspondent_account',
        'bank',
        'cod_bik',
        'google_id',
        'yandex_id',
        'avatar',
    ];



    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function staff()
    {
        return $this->hasMany(Staff::class);
    }

    public function pdfstaff()
    {
        return $this->hasMany(PdfStaff::class);
    }

    public function work()
    {
        return $this->hasMany(Work::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function calendar()
    {
        return $this->hasMany(Calendar::class);
    }

    public function clients()
    {
        return $this->hasMany(Clients::class);
    }
}
