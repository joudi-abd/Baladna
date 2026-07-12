<?php 

namespace App\Services;
use App\Models\Trip;
use App\Models\Booking;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class BookingService{

    public function __construct(private NotificationService $notificationService)
    {
    }
    public function store(array $data){
        return DB::transaction(function () use ($data) {
            $trip = Trip::findOrFail($data['trip_id']);
            $this->validateTrip($trip, $data['participants_count']);
            $totalPrice = $this->calculateTotalPrice($trip, $data['participants_count']);
            $booking = Booking::create([
                'user_id' => auth()->id(),
                'trip_id' => $trip->id,
                'total_price' => $totalPrice,
                'status' => Booking::STATUS_PENDING,
                'participants_count' => $data['participants_count'],
                'notes' => $data['notes'] ?? null,
            ]);
            $this->notificationService->bookingCreated(auth()->user());
            $this->updateAvailableSeats($trip, $data['participants_count']);
            return $booking;
        });

    }

    private function calculateTotalPrice(Trip $trip, int $participantsCount): float
    {
        return $trip->price * $participantsCount;
    }

    private function updateAvailableSeats(Trip $trip, int $participantsCount): void
    {
        $trip->decrement('available_seats', $participantsCount);
    }
    private function validateTrip(Trip $trip, int $participantsCount): void
    {
        if ($trip->status !== 'upcoming') {
            throw ValidationException::withMessages(['trip' => 'This trip is not available for booking.']);
        }
        if ($trip->trip_date->isPast()) {
            throw ValidationException::withMessages(['trip' => 'Booking for this trip has closed.']);
        }

        if ($trip->available_seats < $participantsCount) {
            throw ValidationException::withMessages(['participants_count' => 'Not enough available seats for this trip.']);
        }

        $alreadyBooked = Booking::where('user_id' , auth()->id())
            ->where('trip_id', $trip->id)
            ->whereIn('status', [Booking::STATUS_PENDING, Booking::STATUS_CONFIRMED])
            ->exists();
        if ($alreadyBooked) {
            throw ValidationException::withMessages(['trip' => 'You have already booked this trip.']);
        }
    }

    public function getUserBookings(array $filters = [])
    {
        return Booking::query()
            ->with('trip')
            ->where('user_id', auth()->id())
            ->when(!empty($filters['status']), fn ($query) => 
                $query->where('status', $filters['status'])
            )
            ->latest()
            ->paginate($filters['per_page'] ?? 10);
    }

    public function cancelBooking(Booking $booking): Booking
    {
        
        if ($booking->user_id !== auth()->id()) {
            throw ValidationException::withMessages(['booking' => 'Unauthorized action.']);
        }
        if ($booking->status === Booking::STATUS_CANCELLED) {
            throw ValidationException::withMessages(['booking' => 'This booking is already cancelled.']);
        }

        return DB::transaction(function () use ($booking) {
                $booking->update(['status' => Booking::STATUS_CANCELLED]);
                $booking->trip->increment('available_seats', $booking->participants_count);
                $this->notificationService->bookingCancelled(auth()->user());
                return $booking->fresh()->load('trip');
            });
    }

    public function updateBooking(Booking $booking, array $data): Booking
    {
        if ($booking->user_id !== auth()->id()) {
            throw ValidationException::withMessages(['booking' => 'Unauthorized action.']);
        }
        if ($booking->status === Booking::STATUS_CANCELLED) {
            throw ValidationException::withMessages(['booking' => 'This booking is cancelled and cannot be updated.']);
        }

        return DB::transaction(function () use ($booking, $data) {
            if(in_array($booking->status, [Booking::STATUS_CANCELLED, Booking::STATUS_COMPLETED])){
                throw ValidationException::withMessages(['booking' => 'This booking is already cancelled or completed and cannot be updated.']);
            }
            $trip = $booking->trip;
            $newParticipantsCount = $data['participants_count'] ?? $booking->participants_count;
            $oldParticipantsCount = $booking->participants_count;
            $difference = $newParticipantsCount - $oldParticipantsCount;
            if ($difference > 0) {
                if ($trip->available_seats < $difference) {
                    throw ValidationException::withMessages(['participants_count' => 'Not enough available seats for this trip.']);
                }
                $trip->decrement('available_seats', $difference);
            }
            if ($difference < 0) {
                $trip->increment('available_seats', abs($difference));
            }
            $totalPrice = $this->calculateTotalPrice($trip, $newParticipantsCount);
            $booking->update([
                'participants_count' => $newParticipantsCount,
                'total_price' => $totalPrice,
                'notes' => $data['notes'] ?? $booking->notes,
            ]);

            return $booking->fresh()->load('trip');
        });
    }
}