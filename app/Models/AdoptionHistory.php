<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdoptionHistory extends Model
{
    protected $fillable = [
        'pet_id',
        'adopter_id',
        'previous_owner_id',
        'adoption_request_id',
        'adoption_date',
    ];

    public function pet()
    {
        return $this->belongsTo(Pet::class);
    }

    public function adopter()
    {
        return $this->belongsTo(User::class, 'adopter_id');
    }

    public function previousOwner()
    {
        return $this->belongsTo(User::class, 'previous_owner_id');
    }

    public function adoptionRequest()
    {
        return $this->belongsTo(AdoptionRequest::class);
    }
}
