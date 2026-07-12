<?php

namespace App\Http\Controllers\Api\Profile;

use App\Http\Controllers\Controller;
use App\Services\ProfileService;
use App\Http\Resources\ProfileResource;
use App\Http\Requests\profile\UpdateProfileRequest;
use App\Http\Requests\profile\UpdatePasswordRequest;
use App\Http\Requests\profile\UpdateProfileImageRequest;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function __construct(private ProfileService $profileService)
    {

    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function show()
    {
        $user = $this->profileService->getProfile();
        return response()->json([
            'success' => true,
            'message' => 'Profile retrieved successfully',
            'data' => new ProfileResource($user)
            ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProfileRequest $request)
    {
        $user = $this->profileService->updateProfile($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully',
            'data' => new ProfileResource($user)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updatePassword(UpdatePasswordRequest $request)
    {
        $this->profileService->updatePassword($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Password updated successfully',
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateImage(UpdateProfileImageRequest $request)
    {
        $user = $this->profileService->updateProfileImage($request->file('image'));
        return response()->json([
            'success' => true,
            'message' => 'Profile image updated successfully',
            'data' => new ProfileResource($user)
        ]);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
