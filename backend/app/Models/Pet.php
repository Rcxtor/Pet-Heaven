<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pet extends Model
{
    /**
     * The attributes that are mass assignable.
     * 
     */
    use HasFactory;
    protected $fillable = [
        'user_id','name','species','age','breed','description','user_id','status',     
    ];

    public function adoptionRequests()
    {
        return $this->hasMany(AdoptionRequest::class);
    }

    public function flaggedReports()
    {
        return $this->hasMany(FlaggedPet::class);
    }

    public function adoptionHistories()
    {
        return $this->hasMany(AdoptionHistory::class);
    }
    public function user()
      {
          return $this->belongsTo(User::class);
      }
}
