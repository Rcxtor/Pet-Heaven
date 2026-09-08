<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdoptionHistory extends Model
{
    protected $fillable = [
        'pet_id','user_id','adoption_date'  
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
