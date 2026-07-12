<?php
namespace App\Services;

use App\Models\Review;
use App\Models\Place;
use App\Models\Trip;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\DB;

class ReviewService
{
    public function __construct(private NotificationService $notificationService)
    {
    }
    public function create(array $data)
    {
        return DB::transaction(function () use ($data) {
            $model = match ($data['reviewable_type']) {
                'place' => Place::class,
                'trip'  => Trip::class,
            };

            $reviewable = $model::findOrFail($data['reviewable_id']);

            $review = $reviewable->reviews()->create([
                'user_id' => auth()->id(),
                'rating'  => $data['rating'],
                'comment' => $data['comment'] ?? null,
            ]);

            // Update statistics
            $this->updateStatistics($reviewable);
            $this->notificationService->reviewCreated(auth()->user());
            return $review;
        });

    }

    public function update($review, array $data)
    {
        if($review->user_id !== auth()->id()) {
            throw new AuthorizationException('You are not authorized to update this review.');
        }
        return DB::transaction(function () use ($review, $data) {
            $review->update([
                'rating' => $data['rating'],
                'comment' => $data['comment'] ?? null,
            ]);

            // Update statistics
            $this->updateStatistics($review->reviewable);
            $this->notificationService->reviewUpdated(auth()->user());
            return $review;
        });

    }

    public function delete($review)
    {
        if($review->user_id !== auth()->id()) {
            throw new AuthorizationException('You are not authorized to delete this review.');
        }
        return DB::transaction(function () use ($review) {
            $reviewable = $review->reviewable;
            $review->delete();

            // Update statistics
            $this->updateStatistics($reviewable);
            $this->notificationService->reviewDeleted(auth()->user());
        });

    }   

    private function updateStatistics($reviewable)
    {
        $reviewable->update([
            'rating_avg' => round($reviewable->reviews()->avg('rating'), 2),
            'reviews_count' => $reviewable->reviews()->count(),
        ]);
    }

    public function getReviews($reviewable, int $perPage = 10)
    {
        return $reviewable->reviews()
            ->with('user')
            ->latest()
            ->paginate($perPage);
    }
}