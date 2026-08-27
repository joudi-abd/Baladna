<?php

namespace App\Services;
use App\Models\Payment;
use App\Models\Booking;
use Illuminate\Validation\ValidationException;

class PaymentService
{

     public function __construct(private NotificationService $notificationService)
    {
    }
    public function createPayment(array $data): Payment
    {
        $booking = Booking::with('trip')->where('id', $data['booking_id'])->where('user_id', auth()->id())->first();

        if (!$booking) {
            throw ValidationException::withMessages(['booking_id' => 'Booking not found.']);
        }
        if($booking->payment){
            throw ValidationException::withMessages(['booking_id' => 'This booking has already been paid.']);
        }
        if ($booking->status !== Booking::STATUS_PENDING) {
            throw ValidationException::withMessages(['booking_id' => 'Payment can only be made for pending bookings.']);
        }
        $amount = $booking->trip->price * $booking->participants_count;
        $proofImagePath = null;
        if (isset($data['proof_image'])) {
            $proofImagePath = $data['proof_image']->store('payments', 'public');
        }
        $payment = Payment::create([
            'booking_id' => $booking->id,
            'amount' => $amount,
            'payment_method' => $data['payment_method'],
            'transaction_reference' => $data['transaction_reference'] ?? null,
            'proof_image' => $proofImagePath,
            'status' => Payment::STATUS_PENDING,
        ]);

        return $payment->fresh();
    }

    public function approvePayment(Payment $payment): Payment
    {
        if ($payment->status !== Payment::STATUS_PENDING) {
            throw ValidationException::withMessages(['payment' => 'Only pending payments can be approved.']);
        }
        $payment->update([
            'status' => Payment::STATUS_COMPLETED ,
            'paid_at' => now()
        ]);

        $payment->booking->update(['status' => Booking::STATUS_CONFIRMED]);

        // Notify the user about the completed payment
        $this->notificationService->paymentCompleted($payment->booking->user);

        return $payment->fresh();
    }

    public function rejectPayment(Payment $payment): Payment
    {
        if ($payment->status !== Payment::STATUS_PENDING) {
            throw ValidationException::withMessages(['payment' => 'Only pending payments can be rejected.']);
        }
        $payment->update([
            'status' => Payment::STATUS_FAILED,
        ]);

        $payment->booking->update(['status' => Booking::STATUS_PENDING]);

        // Notify the user about the rejected payment
        $this->notificationService->paymentRejected($payment->booking->user);

        return $payment->fresh();
    }

    public function getUserPayments()
    {
        return Payment::whereHas('booking', function ($query) {
            $query->where('user_id', auth()->id());
        })->with('booking')->latest()->paginate(10);
    } 

    public function getPayment(Payment $payment): Payment
    {
        if ($payment->booking->user_id !== auth()->id()) {
            throw ValidationException::withMessages(['payment' => 'Payment not found.']);
        }
        return $payment->fresh();
    }
}