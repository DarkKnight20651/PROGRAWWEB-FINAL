<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Instructor;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category'); // Campo para la categoría del curso
            $table->foreignIdFor(Instructor::class)->unique()->constrained()->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps(); // Aquí asumo que tienes una tabla instructors
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
