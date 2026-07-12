<?php
namespace App\Services;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Storage;

class ProfileService
{
    public function getProfile(): User
    {
        return auth()->user();
    }

    public function updateProfile(array $data): User
    {
        $user = auth()->user();
        $user->update($data);
        return $user;
    }

    public function updatePassword(array $data): void
    {
        $user = auth()->user();
        if(!Hash::check($data['current_password'], $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['Current password does not match']
            ]);
        }
        $user->update([
            'password' => Hash::make($data['password'])
        ]);
    }

    public function updateProfileImage($image): User
    {
        $user = auth()->user();
        if($user->image && Storage::disk('public')->exists($user->image)) {
            Storage::disk('public')->delete($user->image);
        }
        $path = $image->store('profiles', 'public');
        $user->update(['image' => $path]);
        return $user->fresh();
    }
}