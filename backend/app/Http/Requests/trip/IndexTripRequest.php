<?php

namespace App\Http\Requests\trip;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class IndexTripRequest extends FormRequest
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
            'search' => 'nullable|string|max:255',
            'city_id' => 'nullable|exists:cities,id',
            'category_id' => 'nullable|exists:categories,id',
            'transportation_type' => 'nullable|in:bus,mini_bus,train,tour_bus',
            'trip_date' => 'nullable|date',
            'budget_min'=> 'nullable|numeric|min:0',
            'budget_max'=> 'nullable|numeric|min:0',
            'status' => 'nullable|in:upcoming,ongoing,completed,cancelled',
            'sort' => 'nullable|in:title,price,trip_date', 
            'per_page' => 'nullable|integer|min:1|max:100',
        ];
    }
}
