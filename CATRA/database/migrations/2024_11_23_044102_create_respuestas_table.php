<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRespuestasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('respuestas', function (Blueprint $table) {
            $table->id();  // Crea la columna id como clave primaria
            $table->string('texto');  // columna para 'texto' (string) de la respuesta
            $table->foreignId('id_pregunta')->constrained('preguntas')->onDelete('cascade')->onUpdate('cascade');
            $table->string('path_imagen')->nullable();  // columna para 'path_imagen' (url de la imagen)
            $table->boolean('is_correct');  // columna para 'is_correct' (booleano)
            $table->timestamps();  // Agrega las columnas 'created_at' y 'updated_at'
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('respuestas');
    }
}
