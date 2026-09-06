<?php
namespace App\Services;

use App\Models\Place;
use App\Models\Trip;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Validation\ValidationException;

class MapService 
{
    public function getPlaceLocation(Place $place): array
    {
        if ($place->latitude === null || $place->longitude === null) {
            throw ValidationException::withMessages(['place' => 'Place does not have valid coordinates.']);
        }

        return [
            'id' => $place->id,
            'name' => $place->name,
            'latitude' => $place->latitude,
            'longitude' => $place->longitude,
        ];
    }

    public function getTripLocations(Trip $trip): array
    {
        $places = $trip->places()
        ->whereNotNull('latitude')
        ->whereNotNull('longitude')
        ->orderBy('order_no')
        ->get([
            'places.id',
            'places.name',
            'places.latitude',
            'places.longitude',
        ]);

        return [
            'meeting_point' => [
                'name' => $trip->meeting_point,
                'latitude' => $trip->meeting_latitude,
                'longitude' => $trip->meeting_longitude,
            ],
            'places' => $places
        ];
    }
}