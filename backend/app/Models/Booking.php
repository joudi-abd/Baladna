<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'user_id',
        'trip_id',
        'total_price',
        'status',
        'participants_count',
        'notes',
    ];

    protected $casts = [
        'total_price' => 'decimal:2',
        'participants_count' => 'integer',
    ];

    const STATUS_PENDING = 'pending';
    const STATUS_CONFIRMED = 'confirmed';
    const STATUS_CANCELLED = 'cancelled';
    const STATUS_COMPLETED = 'completed';


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function trip()
    {
        return $this->belongsTo(Trip::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    public function isConfirmed(): bool
    {
        return $this->status === self::STATUS_CONFIRMED;
    }
    
    public function isCancelled(): bool
    {
        return $this->status === self::STATUS_CANCELLED;
    }
    
    public function canCancel(): bool
    {
        $tripDate = $this->trip->trip_date;
        return !$this->isCancelled() && $tripDate->isFuture();
    }
}
