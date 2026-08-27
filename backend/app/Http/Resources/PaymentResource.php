<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'booking_id' => $this->booking_id,
            'amount' => $this->amount,
            'payment_method' => $this->payment_method,
            'transaction_reference' => $this->transaction_reference,
            'proof_image' => $this->proof_image ? asset('storage/' . $this->proof_image) : null,
            'paid_at' => $this->paid_at,
            'status' => $this->status,
            'created_at' => $this->created_at,
        ];
    }
}
