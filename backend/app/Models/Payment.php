<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'booking_id',
        'amount',
        'payment_method',
        'transaction_reference',
        'proof_image',
        'paid_at',
        'status'
    ];

    protected $casts = [
        'amount' => 'float',
        'paid_at' => 'datetime',
    ];
    const STATUS_PENDING = 'pending';
    const STATUS_COMPLETED = 'completed';
    const STATUS_FAILED = 'failed';

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function isCompleted(): bool
    {
        return $this->status === self::STATUS_COMPLETED;
    }
    
    public function markAsCompleted(string $reference = null): void
    {
        $this->status = self::STATUS_COMPLETED;
        $this->paid_at = Carbon::now();
        if ($reference) {
            $this->transaction_reference = $reference;
        }
        $this->saveQuietly();
    }
}
