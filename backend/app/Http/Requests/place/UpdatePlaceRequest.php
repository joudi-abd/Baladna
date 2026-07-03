<?php

namespace App\Http\Requests\place;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePlaceRequest extends FormRequest
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
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'address' => 'sometimes|string|max:255',
            'latitude' => 'sometimes|numeric|between:-90,90',
            'longitude' => 'sometimes|numeric|between:-180,180',
            'city_id' => 'sometimes|exists:cities,id',
            'category_id' => 'sometimes|exists:categories,id',
            'phone' => 'nullable|string|max:20',
            'website' => 'nullable|url',
            'cover_image' => 'nullable|string',
            'status' => 'boolean',
        ];
    }
}
