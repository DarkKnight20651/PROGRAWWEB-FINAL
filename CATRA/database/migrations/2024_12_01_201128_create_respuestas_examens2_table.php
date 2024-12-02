<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('respuesta_examens', function (Blueprint $table) {
            $table->id(); // id bigint NOT NULL AUTO_INCREMENT
            $table->unsignedBigInteger('id_pregunta')->nullable(); // id_pregunta bigint DEFAULT NULL
            $table->unsignedBigInteger('id_respuesta')->nullable(); // id_respuesta bigint DEFAULT NULL
            $table->unsignedBigInteger('id_examen_asignado')->nullable(); // id_examen_asignado bigint DEFAULT NULL
            $table->timestamps(); // created_at, updated_at

            // Opcional: Relaciones foráneas
            // $table->foreign('id_pregunta')->references('id')->on('preguntas')->onDelete('cascade');
            // $table->foreign('id_respuesta')->references('id')->on('respuestas')->onDelete('cascade');
            // $table->foreign('id_examen_asignado')->references('id')->on('examens_asignados')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('respuesta_examens');
    }
};
