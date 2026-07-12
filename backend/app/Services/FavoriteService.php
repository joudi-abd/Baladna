<?php
namespace App\Services;

use App\Models\Favorite;
use App\Models\Place;
use App\Models\Trip;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class FavoriteService
{
    public function __construct(private NotificationService $notificationService)
    {
    }
    public function addToFavorites(array $data)
    {
        $model = match ($data['favoritable_type']) {
            'place' => Place::class,
            'trip'  => Trip::class,
        };

        $favoritable = $model::findOrFail($data['favoritable_id']);
        $exists = $favoritable->favorites()->where('user_id', auth()->id())->exists();

        if ($exists) {
            throw ValidationException::withMessages([
                'favorite' => ['This item is already in your favorites.'],
            ]);
            
        }
        $this->notificationService->favoriteAdded(auth()->user());
        return $favoritable->favorites()->create([
            'user_id' => auth()->id(),
        ]);
        

    }

    public function removeFromFavorites(Favorite $favorite)
    {
        if($favorite->user_id !== auth()->id()) {
            throw ValidationException::withMessages([
                'favorite' => ['You are not authorized to remove this favorite.'],
            ]);
        }

        $favorite->delete();
        $this->notificationService->favoriteRemoved(auth()->user());
    }

    public function getFavorites(int $perPage = 10)
    {
        return Favorite::query()
            ->where('user_id', auth()->id())
            ->with([
                'favoritable' 
            ])
            ->latest()
            ->paginate($perPage);
    }
}