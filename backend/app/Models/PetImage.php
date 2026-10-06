<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PetImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'pet_id',
        'image_path',
    ];

    public function pet()
    {
        return $this->belongsTo(Pet::class);
    }
}