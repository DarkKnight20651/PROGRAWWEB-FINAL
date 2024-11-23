<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Respuesta extends Model
{
    use HasFactory;
    protected $fillable = [
        'texto',
        'id_pregunta',
        'path_imagen',
        'is_correct',
    ];
    protected $appends = ['imagen_url'];
    public function pregunta()
    {
        return $this->belongsTo(Pregunta::class, 'id_pregunta');
    }
    public function getImagenUrlAttribute()
    {
        if ($this->path_imagen && Storage::exists($this->path_imagen)) {
            return Storage::url($this->path_imagen);
        }
        return null;
    }
}
