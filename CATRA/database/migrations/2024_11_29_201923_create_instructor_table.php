<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('instructors', function (Blueprint $table) {
            $table->string('curp')->primary();
            $table->foreignIdFor(User::class)->unique()->constrained()->onDelete('cascade')->onUpdate('cascade');
            $table->string('telefono');
            $table->string('nombre');
            $table->string('ape_p');
            $table->string('ape_m');
            $table->date('fecha_nac');
            $table->integer('genero');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('instructor');
    }
};
