<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     *
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->boolean('is_admin')->default(0);
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable(); // Changed to nullable()
            $table->string('google_id')->nullable(); // Added
            $table->string('yandex_id')->nullable(); // Added
            $table->string('avatar')->nullable();
            $table->string('company')->nullable();
            $table->string('ogrnip')->nullable();
            $table->string('inn')->nullable();
            $table->string('address')->nullable();
            $table->string('payment_account')->nullable();
            $table->string('correspondent_account')->nullable();
            $table->string('bank')->nullable();
            $table->string('cod_bik')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
