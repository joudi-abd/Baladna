<?php

use App\Http\Controllers\Api\About\AboutController;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Contact\ContactController;
use App\Http\Controllers\Api\Favorites\FavoriteController;
use App\Http\Controllers\Api\Payments\PaymentController;
use App\Http\Controllers\Api\Places\PlaceController;
use App\Http\Controllers\Api\Trips\TripController;
use App\Http\Controllers\Api\Reviews\ReviewController;
use App\Http\Controllers\Api\Cities\CityController;
use App\Http\Controllers\Api\Categories\CategoryController;
use App\Http\Controllers\Api\Features\FeatureController;
use App\Http\Controllers\Api\Bookings\BookingController;
use App\Http\Controllers\Api\Profile\ProfileController;
use App\Http\Controllers\Api\Notifications\NotificationController;
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

Route::prefix('reviews')->middleware('auth:sanctum')->group(function () {
    Route::post('/', [ReviewController::class, 'store']);
    Route::put('/{review}', [ReviewController::class, 'update']);
    Route::delete('/{review}', [ReviewController::class, 'destroy']);
});

Route::prefix('favorites')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [FavoriteController::class, 'index']);
    Route::post('/', [FavoriteController::class, 'store']);
    Route::delete('/{favorite}', [FavoriteController::class, 'destroy']);
});

Route::get('cities', [CityController::class, 'index']);
Route::get('categories', [CategoryController::class, 'index']);
Route::get('features',[FeatureController::class, 'index']);
Route::get('/about', [AboutController::class, 'index']);
Route::post('/contact', [ContactController::class, 'store']);
Route::get('/contact', [ContactController::class, 'index']); //غير مُرسل الى الفرونت اند

Route::middleware('auth:sanctum')->group(function (){
    Route::get('my-bookings', [BookingController::class, 'index']);
    Route::post('bookings', [BookingController::class, 'store']);
    Route::delete('bookings/{booking}', [BookingController::class, 'destroy']);
    Route::put('bookings/{booking}', [BookingController::class, 'update']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::put('/profile/password', [ProfileController::class, 'updatePassword']);
    Route::post('/profile/image', [ProfileController::class, 'updateImage']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::put('/notifications/{notification}', [NotificationController::class, 'markAsRead']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/payments', [PaymentController::class, 'store']);
    Route::get('/my-payments', [PaymentController::class, 'index']);
    Route::get('/payments/{payment}', [PaymentController::class, 'show']);
});

Route::middleware(['auth:sanctum','permission:confirm payments'])
    ->put('payments/{payment}/approve', [PaymentController::class, 'approve']);

Route::middleware(['auth:sanctum','permission:reject payments'])
    ->put('payments/{payment}/reject', [PaymentController::class, 'reject']);