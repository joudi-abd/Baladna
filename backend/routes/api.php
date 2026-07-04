<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Places\PlaceController;
use App\Http\Controllers\Api\Trips\TripController;
use App\Http\Controllers\Api\Reviews\ReviewController;
use Illuminate\Http\Request;

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
// Route::get('/test', function () {
//     return response()->json(['message' => 'API works']);
// });


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/me', [AuthController::class, 'me']);

Route::get('/places', [PlaceController::class, 'index']);
Route::get('/places/featured', [PlaceController::class, 'featured']);
Route::get('/places/{place}', [PlaceController::class, 'show']);
Route::get('/places/{place}/reviews', [PlaceController::class, 'reviews']);

Route::get('/trips',[TripController::class, 'index']); 
Route::get('/trips/{trip}',[TripController::class, 'show']); 
Route::get('/trips/{trip}/reviews', [TripController::class, 'reviews']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/reviews', [ReviewController::class, 'store']);
    Route::put('/reviews/{review}', [ReviewController::class, 'update']);
    Route::delete('/reviews/{review}', [ReviewController::class, 'destroy']);
});


