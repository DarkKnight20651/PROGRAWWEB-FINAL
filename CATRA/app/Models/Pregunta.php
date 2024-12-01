<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Pregunta extends Model
{
    use HasFactory;
    protected $fillable = [
        'texto',
        'id_examen',
        'path_imagen',
    ];
    protected $appends = ['imagen_url'];

    public function getImagenUrlAttribute()
    {
        if ($this->path_imagen && Storage::exists($this->path_imagen)) {
            return Storage::url($this->path_imagen);
        }
        return null;
    }
    public function examen()
    {
        return $this->belongsTo(Examen::class, 'id_examen');
    }
    public function respuestas()
    {
        return $this->hasMany(Respuesta::class, 'id_pregunta');
    }
    public function RespuestaExamen()
    {
        return $this->hasMany(RespuestaExamen::class, 'id_pregunta');
    }
}
