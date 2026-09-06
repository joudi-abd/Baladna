<?php
namespace App\Services;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Validation\ValidationException;

class NotificationService
{
    private function createNotification(User $user, string $title, string $body): ?Notification
    {
    
        if(!$user->notifications_enabled) {
            return null; // User has disabled notifications
        }

        return Notification::create([
            'user_id' => $user->id,
            'title' => $title,
            'body' => $body,
        ]);
    }

    public function getUserNotifications($filters)
    {
        return Notification::query()
        ->where('user_id', auth()->id())
        ->when(isset($filters['is_read']), function ($query) use ($filters) {
            $query->where('is_read', $filters['is_read']);
        })

        ->latest()
        ->paginate($filters['per_page'] ?? 10);
    }
    public function markAsRead($notification): ?Notification
    {
        if ($notification->user_id !== auth()->id()) {
            throw ValidationException::withMessages([
                'notification' => ['Unauthorized action.']
            ]);
        }
        $notification->update(['is_read' => true]);
        
        return $notification->fresh();
    }

    public function bookingCreated(User $user):?Notification
    {
        return $this->createNotification(
            $user,
            'Booking Created',
            'Your booking has been created successfully.'
        );
    }

    public function bookingCancelled(User $user):?Notification
    {
        return $this->createNotification(
            $user,
            'Booking Cancelled',
            'Your booking has been cancelled successfully.'
        );
    }

    public function bookingUpdated(User $user):?Notification
    {
        return $this->createNotification(
            $user,
            'Booking Updated',
            'Your booking has been updated successfully.'
        );
    }

    public function reviewCreated(User $user):?Notification
    {
        return $this->createNotification(
            $user,
            'Review Created',
            'Your review has been created successfully.'
        );
    }

    public function reviewUpdated(User $user):?Notification
    {
        return $this->createNotification(
            $user,
            'Review Updated',
            'Your review has been updated successfully.'
        );
    }

    public function reviewDeleted(User $user):?Notification
    {
        return $this->createNotification(
            $user,
            'Review Deleted',
            'Your review has been deleted successfully.'
        );
    }
    public function favoriteAdded(User $user):?Notification
    {
        return $this->createNotification(
            $user,
            'Favorite Added',
            'The trip has been added to your favorites.'
        );
    }

    public function favoriteRemoved(User $user):?Notification
    {
        return $this->createNotification(
            $user,
            'Favorite Removed',
            'The trip has been removed from your favorites.'
        );
    }
    
    public function paymentCompleted(User $user):?Notification
    {
        return $this->createNotification(
            $user,
            'Payment Completed',
            'Your payment has been completed successfully.'
        );
    }

    public function paymentRejected(User $user):?Notification
    {
        return $this->createNotification(
            $user,
            'Payment Rejected',
            'Your payment has been rejected.'
        );
    }

}