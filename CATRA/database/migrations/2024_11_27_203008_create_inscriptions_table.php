<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('inscriptions', function (Blueprint $table) {
            $table->id(); // ID de la inscripción
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Clave foránea para usuarios
            $table->char('category', 1); // Categoría de una sola letra
            $table->string('responsable', 25)->nullable(); // Responsable puede ser nulo
            $table->string('observaciones', 50)->nullable(); // Observaciones pueden ser nulas
            $table->enum('tipo', ['Renovacion', 'Obtencion'])->default('Obtencion'); // Tipo de inscripción
            $table->enum('alcance', ['Nacional', 'Internacional'])->default('Nacional'); // Alcance de inscripción
            $table->timestamps(); // created_at y updated_at
        });
    }

    public function down(): void {
        Schema::dropIfExists('inscriptions');
    }
};
