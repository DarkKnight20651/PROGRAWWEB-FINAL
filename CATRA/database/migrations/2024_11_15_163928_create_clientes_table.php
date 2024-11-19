<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientesTable extends Migration
{
    /**
     * Ejecuta la migración.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clientes', function (Blueprint $table) {
            $table->string('curp')->primary();
            $table->foreignIdFor(User::class)->unique()->constrained()->onDelete('cascade')->onUpdate('cascade');
            $table->string('telefono');
            $table->string('nombre');
            $table->string('ape_p');
            $table->string('ape_m');
            $table->date('fecha_nac');
            $table->integer('genero');
            $table->timestamps();
        });
    }

    /**
     * Revierte la migración.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clientes');
    }
}
