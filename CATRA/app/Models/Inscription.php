<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inscription extends Model
{
    use HasFactory;

    // Definir la tabla asociada
    protected $table = 'inscriptions';

    // Campos que se pueden llenar masivamente
    protected $fillable = [
        'user_id',
        'category',
        'responsable',
        'observaciones',
        'tipo',
        'alcance',
    ];

    // Relación con el modelo User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
}
