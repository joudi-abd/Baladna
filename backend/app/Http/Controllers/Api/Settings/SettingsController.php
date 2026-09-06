<?php

namespace App\Http\Controllers\Api\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\settings\ChangePasswordRequest;
use App\Http\Requests\settings\DeleteAccountRequest;
use App\Http\Requests\settings\UpdateEmailRequest;
use App\Http\Requests\settings\UpdateNotificationSettingRequest;
use App\Services\SettingsService;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function __construct(private SettingsService $settingsService)
    {
    }

    public function updateEmail(UpdateEmailRequest $request)
    {
        $user = $this->settingsService->updateEmail($request->input('email'));

        return response()->json([
            'success' => true,
            'message' => 'Email updated successfully.',
            'user' => $user,
        ]);
    }


    public function updateNotificationSetting(UpdateNotificationSettingRequest $request)
    {
        $user = $this->settingsService->updateNotificationSetting($request->input('notifications_enabled'));

        return response()->json([
            'success' => true,
            'message' => 'Notification setting updated successfully.',
            'data' => ['notifications_enabled' => $user->notifications_enabled],
        ]);
    }

    public function deleteAccount(DeleteAccountRequest $request)
    {
        $this->settingsService->deleteAccount();

        return response()->json([
            'success' => true,
            'message' => 'Account deleted successfully.',
        ]);
    }
}
