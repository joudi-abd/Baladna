<?php

namespace App\Http\Controllers\Api\Notifications;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Services\NotificationService;
use App\Http\Requests\notifications\IndexNotificationRequest;
use App\Http\Resources\NotificationResource;
use Illuminate\Http\Request;

class NotificationController extends Controller
{

    public function __construct(private NotificationService $notificationService)
    {
    }
    /**
     * Display a listing of the resource.
     */
    public function index(IndexNotificationRequest $request)
    {
        $filters = $request->validated();
        $notifications = $this->notificationService->getUserNotifications($filters);
        return response()->json([
            'success' => true,
            'message' => 'Notifications retrieved successfully',
            'data' => NotificationResource::collection($notifications),
        ]);
    }

    /**
     * Mark a notification as read.
     */

    public function markAsRead(Notification $notification)
    {
        $notification = $this->notificationService->markAsRead($notification);
        return response()->json([
            'success' => true,
            'message' => 'Notification marked as read successfully',
            'data' => new NotificationResource($notification)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
    public function destroy(string $id)
    {
        //
    }
}
