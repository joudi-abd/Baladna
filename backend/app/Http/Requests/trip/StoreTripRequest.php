<?php

namespace App\Http\Requests\trip;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreTripRequest extends FormRequest
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
        'title'=>'required|string|max:255',
        'description'=>'required|string',
        'price'=>'required|numeric|min:0',
        'trip_date'=>'required|date|after:today',
        'duration'=>'required|string|max:100',
        'transportation_type'=>'required|in:bus,mini_bus,train,tour_bus',
        'meeting_point'=>'required|string|max:255',
        'max_participants'=>'required|integer|min:1',
        'available_seats'=>'required|integer|min:0|lte:max_participants',
        'cover_image'=>'nullable|image',
        'city_id'=>'required|exists:cities,id',
        'status'=>'required|in:upcoming,ongoing,completed,cancelled'
        ];
    }
}
