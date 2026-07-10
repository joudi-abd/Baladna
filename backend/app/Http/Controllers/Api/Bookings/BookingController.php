<?php

namespace App\Http\Controllers\Api\Bookings;

use App\Http\Controllers\Controller;
use App\Http\Requests\booking\StoreBookingRequest;
use App\Http\Requests\booking\IndexBookingRequest;
use App\Http\Requests\booking\UpdateBookingRequest;
use App\Http\Resources\BookingResource;
use App\Services\BookingService;
use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{

    public function __construct(private BookingService $bookingService)
    {}   
    /**
     * Display a listing of the resource.
     */
    public function index(IndexBookingRequest $request)
    {
        $bookings = $this->bookingService->getUserBookings($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'User bookings retrieved successfully',
            'data' => BookingResource::collection($bookings)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookingRequest $request)
    {
        $booking = $this->bookingService->store($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Booking created successfully', 
            'data' => new BookingResource($booking->load('trip'))], 201);
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
    public function update(UpdateBookingRequest $request, Booking $booking)
    {
        $booking = $this->bookingService->updateBooking($booking, $request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Booking updated successfully',
            'data' => new BookingResource($booking->load('trip'))
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    /**
     * -توثيق تجريبي 
     * 
     * - هذه الدالة تقوم بإلغاء الحجز المحدد للمستخدم الحالي.
     */
    public function destroy(Booking $booking)
    {
        $this->bookingService->cancelBooking($booking);
        return response()->json([
            'success' => true,
            'message' => 'Booking cancelled successfully'
        ]);
    }
}
