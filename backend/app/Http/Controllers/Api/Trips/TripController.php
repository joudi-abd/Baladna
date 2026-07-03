<?php

namespace App\Http\Controllers\Api\Trips;

use App\Http\Requests\trip\IndexTripRequest;
use App\Http\Requests\trip\StoreTripRequest;
use App\Http\Requests\trip\UpdateTripRequest;
use App\Http\Resources\TripResource;
use App\Models\Trip;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TripController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexTripRequest $request)
    {
        $query = Trip::with([
            'places.city',
            'places.category'
        ])
        ->when($request->filled('search'), function ($query) use ($request) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhereHas('places', function ($place) use ($search) {
                        $place->where('name', 'like', "%{$search}%");
                  });
            });
        })
        ->when($request->filled('sort'), function ($query) use ($request) {
            if ($request->sort === 'title') {
                $query->orderBy('title');
            } elseif ($request->sort === 'price') {
                $query->orderBy('price');
            } elseif ($request->sort === 'trip_date') {
                $query->orderBy('trip_date');
            }
        })
        ->when($request->filled('city_id'), function ($query) use ($request) {
            $query->whereHas('places', function ($q) use ($request) {
                $q->where('city_id', $request->city_id);
            });
        }
        )
        ->when($request->filled('category_id'), function ($query) use ($request) {
            $query->whereHas('places', function ($q) use ($request) {
                $q->where('category_id', $request->category_id);
            });
        })
        ->when($request->filled('budget_min'), function ($query) use ($request) {
            $query->where('price', '>=', $request->budget_min);
        })
        ->when($request->filled('budget_max'), function ($query) use ($request) {
            $query->where('price', '<=', $request->budget_max);
        })
        ->when($request->filled('transportation_type'), function ($query) use ($request) {
            $query->where('transportation_type', $request->transportation_type);
        })
        ->when($request->filled('trip_date'), function ($query) use ($request) {
            $query->whereDate('trip_date', $request->trip_date);
        })
        ->when($request->filled('status'), function ($query) use ($request) {
            $query->where('status', $request->status);
        });

        $trips = $query->latest()->paginate(
            $request->per_page ?? 10
        );
        return TripResource::collection($trips);
    }

    // public function store(StoreTripRequest $request)
    // {
    //     $data = $request->validated();
    //     $places = $data['places'];
    //     unset($data['places']);
    //     $data['available_seats'] = $data['max_participants'];
    //     $trip = Trip::create($data);
    //     $sync = [];
    //     foreach ($places as $place) {

    //         $sync[$place['place_id']] = [
    //             'order_no' => $place['order_no']
    //         ];
    //     }
    //     $trip->places()->sync($sync);
    //     return new TripResource(
    //         $trip->load('places.city','places.category')
    //     );
    // }

    public function show(Trip $trip)
    {

        return response()->json([
            'success' => true,
            'message' => 'Trip retrieved successfully',
            'data' => new TripResource(
                $trip->load(
                    'places.city',
                    'places.category'
                )
            )
        ]);
    }

    // public function update(UpdateTripRequest $request, Trip $trip)
    // {
    //     $data = $request->validated();
    //     if(isset($data['places'])){
    //         $places = $data['places'];
    //         unset($data['places']);
    //         $sync=[];
    //         foreach($places as $place){
    //             $sync[$place['place_id']] = [
    //                 'order_no'=>$place['order_no']
    //             ];
    //         }
    //         $trip->places()->sync($sync);
    //     }
    //     $trip->update($data);
    //     return new TripResource(
    //         $trip->load(
    //             'places.city',
    //             'places.category'
    //         )
    //     );
    // }
    // public function destroy(Trip $trip)
    // {
    //     $trip->places()->detach();
    //     $trip->delete();
    //     return response()->json([
    //         'message'=>'Trip deleted successfully.'
    //     ]);
    // }
}
