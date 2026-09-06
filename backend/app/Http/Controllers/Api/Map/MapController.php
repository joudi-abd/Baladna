<?php

namespace App\Http\Controllers\Api\Map;

use App\Http\Controllers\Controller;
use App\Models\Place;
use App\Models\Trip;
use App\Services\MapService;
use Illuminate\Http\Request;

class MapController extends Controller
{
    public function __construct(private MapService $mapService)
    {
    }

    public function place(Place $place)
    {
        $place = $this->mapService->getPlaceLocation($place);
        return response()->json([
            'success' => true,
            'message' => 'Place location retrieved successfully.',
            'data' =>[
                'id' => $place['id'] ?? null,
                'name' => $place['name'] ?? null,
                'latitude' => $place['latitude'],
                'longitude' => $place['longitude'],
            ]
        ], 200);
    }

    public function trip(Trip $trip)
    {
        $map = $this->mapService->getTripLocations($trip);
        return response()->json([
            'success' => true,
            'message' => 'Trip locations retrieved successfully.',
            'data' => $map
        ], 200);
    }
}