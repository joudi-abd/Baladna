<?php

namespace App\Http\Controllers\Api\Places;

use App\Http\Controllers\Controller;
use App\Http\Requests\place\IndexPlaceRequest;
use App\Http\Requests\place\StorePlaceRequest;
use App\Http\Requests\place\UpdatePlaceRequest;
use App\Http\Resources\PlaceResource;
use App\Models\Place;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PlaceController extends Controller
{
    public function index(IndexPlaceRequest $request)
    {
        $places = Place::query()

            ->with(['city', 'category'])

            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
                });
            })

            ->when($request->filled('city_id'), function ($query) use ($request) {
                $query->where('city_id', $request->city_id);
            })

            ->when($request->filled('category_id'), function ($query) use ($request) {
                $query->where('category_id', $request->category_id);
            })
            ->when($request->filled('features'), function ($query) use ($request) {
                $query->whereHas('features', function ($q) use ($request) {
                    $q->whereIn('id', $request->features);
                });
            })
            ->when($request->filled('sort'), function ($query) use ($request) {
                if ($request->sort === 'name') {
                    $query->orderBy('name');
                } elseif ($request->sort === 'rating') {
                    $query->orderByDesc('rating_avg');
                }
            })
            ->when(
                $request->filled('status'),
                fn ($query) => $query->where('status', $request->status)
            )

            ->latest()
            ->paginate($request->per_page ?? 15);

        return PlaceResource::collection($places);
    }

    public function show(Place $place)
    {
        return response()->json([
            'success' => true,
            'message' => 'Place retrieved successfully',
            'data' => new PlaceResource(
                $place->load(
                    'city',
                    'category',
                    'features',
                    'media',
                    'reviews'
                )
            )
        ]);
    }

    public function featured(Request $request)
    {
        $limit = max(1, min((int) $request->input('limit', 10), 50));

        $places = Place::query()
            ->with(['city', 'category'])
            ->where('status', true)
            ->orderByDesc('rating_avg')
            ->orderByDesc('reviews_count')
            ->limit($limit)
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Featured places retrieved successfully',
            'data' => PlaceResource::collection($places),
        ]);
    }

    // public function store(StorePlaceRequest $request)
    // {
    //     $place = Place::create($request->validated());
    //     return response()->json([
    //         'success' => true,
    //         'message' => 'created successfully',
    //         'data' => new PlaceResource($place)
    //     ]);
    // }

    // public function update(UpdatePlaceRequest $request, Place $place)
    // {
    //     $place->update($request->validated());
    //     return response()->json([
    //         'success' => true,
    //         'message' => 'updated successfully',
    //         'data' => new PlaceResource($place)
    //     ]);
    // }

    // public function destroy(Place $place)
    // {
    //     $place->delete();
    //     return response()->json([
    //         'success' => true,
    //         'message' => 'deleted successfully'           
    //     ], 200);
    // }
}
