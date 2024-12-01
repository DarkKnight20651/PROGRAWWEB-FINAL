<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RespuestaExamen extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_pregunta',
        'id_respuesta',
        'id_examen_asignado',
        
    ];
    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'id_cliente');
    }
    public function examen()
    {
        return $this->belongsTo(Examens_asignado::class, 'id_examen_asignado');
    }
    public function pregunta()
    {
        return $this->belongsTo(Pregunta::class, 'id_pregunta');
    }
    public function respuesta()
    {
        return $this->belongsTo(Respuesta::class, 'id_respuesta');
    }
    
}
