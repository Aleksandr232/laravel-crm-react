<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('user_id')->nullable();
            $table->string('name');
            $table->string('phone');
            $table->string('organization');
            $table->string('type_work');
            $table->string('duration');
            $table->string('price_service')->nullable();
            $table->string('name_service')->nullable();
            $table->string('address_service')->nullable();
            $table->string('path_doc')->nullable();
            $table->string('name_doc')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
