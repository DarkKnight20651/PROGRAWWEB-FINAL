<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Examens_asignado extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_cliente',
        'id_examen',
        'fecha_asignado',
        'fecha_fin_asignado',
        'hora_inicio',
        'hora_fin',
        'estado',
    ];
    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'id_cliente');
    }
    public function examen()
    {
        return $this->belongsTo(Examen::class, 'id_examen');
    }
    public function RespuestaExamen()
    {
        return $this->hasMany(RespuestaExamen::class, 'id_examen_asignado');
    }
}
