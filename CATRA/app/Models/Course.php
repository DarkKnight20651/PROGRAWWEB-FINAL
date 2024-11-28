<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $table = 'courses';

    protected $fillable = [
        'name', //string
        'category', //text
     ];
     
        public function users()
    {
        return $this->belongsToMany(User::class, 'course_user');
    }
}
