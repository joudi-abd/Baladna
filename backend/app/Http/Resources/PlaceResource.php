<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

// Note: Add imports for related resources as they are created
// use App\Http\Resources\CityResource;
// use App\Http\Resources\CategoryResource;
// use App\Http\Resources\FeatureResource;
// use App\Http\Resources\MediaResource;
// use App\Http\Resources\ReviewResource;

class PlaceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'address' => $this->address,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'phone' => $this->phone,
            'website' => $this->website,
            'cover_image' => $this->cover_image,
            'rating_avg' => $this->rating_avg,
            'reviews_count' => $this->reviews_count,
            'status' => $this->status,
            'city_id' => $this->city_id,
            'category_id' => $this->category_id,
            'favorites_count' => $this->favorites()->count(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
