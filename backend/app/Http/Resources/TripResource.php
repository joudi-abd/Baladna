<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\PlaceResource;

class TripResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [

            'id'=>$this->id,

            'title'=>$this->title,

            'description'=>$this->description,

            'price'=>$this->price,

            'trip_date'=>$this->trip_date,

            'duration'=>$this->duration,

            'meeting_point'=>$this->meeting_point,

            'transportation_type'=>$this->transportation_type,

            'max_participants'=>$this->max_participants,

            'available_seats'=>$this->available_seats,

            'rating_avg'=>$this->rating_avg,

            'reviews_count'=>$this->reviews_count,

            'status'=>$this->status,

            'cover_image'=>$this->cover_image,

            'places'=>PlaceResource::collection(
                $this->whenLoaded('places')
            ),

            'created_at'=>$this->created_at,
        ];
    }
}
