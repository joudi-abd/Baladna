<?php

namespace App\Http\Requests\payment;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StorePaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'booking_id' => ['required', 'integer','exists:bookings,id'],
            'payment_method' => ['required', 'string', 'in:credit_card,debit_card,paypal,bank_transfer'],
            'transaction_reference' => ['nullable', 'string'],
            'proof_image' => ['nullable', 'image','mimes:jpeg,png,jpg,webp', 'max:2048'], // Max size 2MB
        ];
    }
}
