<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExamensAsignadosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('examens_asignados', function (Blueprint $table) {
            $table->id(); // id bigint UN PK
            $table->string('id_cliente', 45); // id_cliente varchar(45)
            $table->unsignedBigInteger('id_examen'); // id_examen bigint
            $table->dateTime('fecha_asignado')->nullable(); // fecha_asignado datetime
            $table->dateTime('fecha_fin_asignado')->nullable(); // fecha_fin_asignado datetime
            $table->timestamps(); // created_at, updated_at
            $table->dateTime('hora_inicio')->nullable(); // hora_inicio datetime
            $table->dateTime('hora_fin')->nullable(); // hora_fin datetime
            $table->string('estado', 25)->nullable(); // estado varchar(25)
            $table->dateTime('hora_limite')->nullable(); // hora_limite datetime
            $table->double('calificacion')->nullable(); // calificacion double

            // Opcional: Si necesitas claves foráneas
            // $table->foreign('id_examen')->references('id')->on('examenes')->onDelete('cascade');
            // $table->foreign('id_cliente')->references('curp')->on('clientes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('examens_asignados');
    }
}
