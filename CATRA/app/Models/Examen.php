<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Examen extends Model
{
    use HasFactory;

    protected $table = 'examenes';

    protected $fillable = [
        'nombre', //string
        'descripcion', //text
        'duracion', //integer
        'tipo', //enum('Inicial', 'Intermedio', 'Final')
        'tipo_licencia', //enum('a', 'b', ..., 'f')
    ];

    public function preguntas()
    {
        return $this->hasMany(Pregunta::class, 'id_examen');
    }
}
