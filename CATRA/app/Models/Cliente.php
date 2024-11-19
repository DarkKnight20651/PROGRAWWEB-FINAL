<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $primaryKey = 'curp';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'curp',
        'telefono',
        'nombre',
        'ape_p',
        'ape_m',
        'fecha_nac',
        'genero',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
