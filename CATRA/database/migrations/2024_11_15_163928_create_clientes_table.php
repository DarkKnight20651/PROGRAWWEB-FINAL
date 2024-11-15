<?php

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
            $table->string('curp')->primary(); // CURP como clave primaria
            $table->foreignId('id_user')->unique(); // ID de usuario
            $table->string('telefono'); // Teléfono
            $table->string('nombre'); // Nombre
            $table->string('ape_p'); // Apellido paterno
            $table->string('ape_m'); // Apellido materno
            $table->date('fecha_nac'); // Fecha de nacimiento
            $table->integer('genero'); // Género (Masculino, Femenino, Otro)
            $table->timestamps(); // Timestamps para created_at y updated_at

            // Relación con la tabla users (si aplica)
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
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
