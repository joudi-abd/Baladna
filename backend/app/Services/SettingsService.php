<?php

namespace App\Services;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class SettingsService
{
   public function updateEmail(string $email): User
   {
         $user = auth()->user();
       $user->email = $email;
       $user->email_verified_at = Carbon::now(); // Reset email verification status
       $user->save();
       return $user->fresh();
   }

   public function updateNotificationSetting(bool $notificationsEnabled): User
   {
       $user = auth()->user();
       $user->notifications_enabled = $notificationsEnabled;
       $user->save();
       return $user->fresh();
   }

   public function deleteAccount(){
    
       $user = auth()->user();
       $user->tokens()->delete(); // Revoke all API tokens
       $user->delete();
       return true;
   }
}
