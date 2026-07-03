<?php

namespace App\Http\Requests\trip;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTripRequest extends FormRequest
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
        'title'=>'sometimes|string|max:255',
        'description'=>'sometimes|string',
        'price'=>'sometimes|numeric|min:0',
        'trip_date'=>'sometimes|date',
        'duration'=>'sometimes|string|max:100',
        'transportation_type'=>'sometimes|in:bus,mini_bus,train,tour_bus',
        'meeting_point'=>'sometimes|string|max:255',
        'max_participants'=>'sometimes|integer|min:1',
        'available_seats'=>'sometimes|integer|min:0|lte:max_participants',
        'cover_image'=>'sometimes|image',
        'status'=>'sometimes|in:upcoming,ongoing,completed,cancelled',
        'places' => 'sometimes|array|min:1',
        'places.*.place_id' => 'required_with:places|exists:places,id',
        'places.*.order_no' => 'required_with:places|integer|min:1'
        ];
    }
}
