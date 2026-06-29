<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'price',
        'trip_date',
        'max_participants',
        'available_seats',
        'transportation_type',
        'duration',
        'meeting_point',
        'cover_image',
        'rating_avg',
        'reviews_count',
        'status'
    ];

    protected $casts = [
        'trip_date' => 'datetime',
        'rating_avg' => 'float',
        'reviews_count' => 'integer',
        'max_participants' => 'integer',
        'available_seats' => 'integer',
];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function places()
    {
        return $this->belongsToMany(Place::class , 'trip_places');
    }

    public function favorites()
    {
        return $this->morphMany(Favorite::class, 'favoritable');
    }

    public function reviews()
    {
        return $this->morphMany(Review::class, 'reviewable');
    }

    public function media()
    {
        return $this->morphMany(Media::class, 'mediable');
    }

}
