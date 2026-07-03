<?php

namespace App\Http\Requests\place;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class IndexPlaceRequest extends FormRequest
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
            'status' => 'nullable|boolean',
            'features' => 'nullable|array',
            // شكل المصفوفة هو كالتالي: features[]=1&features[]=2&features[]=3
            'features.*' => 'exists:features,id',
            'sort' => 'nullable|in:name,rating',
            'per_page' => 'nullable|integer|min:1|max:100',
        ];
    }
}
