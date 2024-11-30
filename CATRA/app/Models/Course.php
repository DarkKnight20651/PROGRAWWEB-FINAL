<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    // Define los campos que se pueden asignar de forma masiva (mass assignment)
    protected $fillable = ['category', 'name', 'instructor_curp'];

    // Relación con el modelo Instructor
    public function instructor()
    {
        return $this->belongsTo(Instructor::class, 'instructor_curp', 'curp');
    }
}
