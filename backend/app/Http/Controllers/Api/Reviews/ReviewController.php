<?php

namespace App\Http\Controllers\Api\Reviews;

use App\Http\Controllers\Controller;
use App\Http\Requests\review\StoreReviewRequest;
use App\Http\Requests\review\UpdateReviewRequest;
use App\Http\Resources\ReviewResource;
use App\Models\Place;
use App\Models\Review;
use App\Models\Trip;
use App\Services\ReviewService;
use DB;
use Illuminate\Http\Request;

class ReviewController extends Controller
{

    public function __construct( private ReviewService $reviewService)
    {}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReviewRequest $request)
    {
        $review = $this->reviewService->create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Review added successfully.',
            'data' => new ReviewResource($review->load('user')),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $review = Review::findOrFail($id);
        return new ReviewResource($review->load('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReviewRequest $request, Review $review)
    {
        $updatedReview = $this->reviewService->update($review, $request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Review updated successfully.',
            'data' => new ReviewResource($updatedReview->load('user')),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        $this->reviewService->delete($review);

        return response()->json([
            'success' => true,
            'message' => 'Review deleted successfully.',
        ]);
    }
}
