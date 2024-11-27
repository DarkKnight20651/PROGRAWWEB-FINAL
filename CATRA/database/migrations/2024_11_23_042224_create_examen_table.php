<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExamenTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('examenes', function (Blueprint $table) {
            $table->id();  // Crea la columna id como clave primaria
            $table->string('nombre');  // columna para 'nombre' (string)
            $table->text('descripcion');  // columna para 'descripcion' (text)
            $table->integer('duracion');  // columna para 'duracion' (integer)
            $table->enum('tipo', ['Inicial', 'Intermedio', 'Final']);  // columna para 'tipo' (enum)
            $table->enum('tipo_licencia', ['a', 'b', 'c', 'd', 'e', 'f']);  // columna para 'tipo_licencia' (enum)
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
        Schema::dropIfExists('preguntas');

        Schema::dropIfExists('examenes');
    }
}
