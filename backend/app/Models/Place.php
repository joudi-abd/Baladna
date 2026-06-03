<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    protected $fillable = [
        'name', 
        'description', 
        'address', 
        'latitude',
        'longitude',
        'city_id',
        'category_id',
        'phone',
        'website',
        'cover_image',
        'rating_avg',
        'reviews_count',
        'status'
    ];

    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
        'rating_avg' => 'float',
        'reviews_count' => 'integer',
        'status' => 'boolean',
    ];

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function features()
    {
        return $this->belongsToMany(Feature::class, 'place_features');
    }

    public function media()
    {
        return $this->morphMany(Media::class, 'mediable');
    }

    public function reviews()
    {
        return $this->morphMany(Review::class, 'reviewable');
    }

    public function favorites()
    {
        return $this->morphMany(Favorite::class, 'favoritable');
    }

    public function trips()
    {
        return $this->belongsToMany(Trip::class, 'trip_places');
    }


}
