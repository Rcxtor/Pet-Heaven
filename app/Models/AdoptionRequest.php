<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AdoptionRequest extends Model
{
    protected $fillable = [
      'pet_id','user_id','status'  
    ];


    public function pet()
    {
        return $this->BelongsTo(Pet::class);
    }
    public function user()
    {
        return $this->BelongsTo(User::class);
    }
}