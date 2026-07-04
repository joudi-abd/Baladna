<?php

namespace App\Http\Controllers\Api\Favorites;

use App\Http\Controllers\Controller;
use App\Http\Requests\favorite\StoreFavoriteRequest;
use App\Http\Resources\FavoriteResource;
use App\Models\Favorite;

use App\Services\FavoriteService;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function __construct(private FavoriteService $favoriteService)
    {
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $favorites = $this->favoriteService->getFavorites($request->integer('per_page', 10));
        return response()->json([
            'success' => true,
            'message' => 'Favorites retrieved successfully',
            'data' => FavoriteResource::collection($favorites),
        ] , 200);
    }
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFavoriteRequest $request)
    {
        $favorite = $this->favoriteService->addToFavorites($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Added to favorites successfully',
            'data' => new FavoriteResource($favorite),
        ], 201);
    }
    

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Favorite $favorite)
    {
        $this->favoriteService->removeFromFavorites($favorite);
        return response()->json([
            'success' => true,
            'message' => 'Removed from favorites successfully',
        ], 200);
    }
}
