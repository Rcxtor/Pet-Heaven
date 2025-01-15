<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdoptionSuccessRate extends Model
{
    protected $fillable = [
        'pet_id','adoption_request_id','status'  
      ];
  
  
      public function pet()
      {
          return $this->BelongsTo(Pet::class);
      }
      public function adoptionRequests()
      {
          return $this->BelongsTo(AdoptionRequest::class);
      }
}
