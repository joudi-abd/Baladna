<?php

namespace App\Http\Requests\place;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StorePlaceRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'required|string|max:255',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'city_id' => 'required|exists:cities,id',
            'category_id' => 'required|exists:categories,id',
            'phone' => 'nullable|string|max:20',
            'website' => 'nullable|url',
            'cover_image' => 'nullable|string',
            'status' => 'boolean',
        ];
    }
}
