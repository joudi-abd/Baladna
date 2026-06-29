<?php

namespace Database\Factories;

use App\Models\Place;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Place>
 */
class PlaceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company(),
            'description' => $this->faker->paragraph(),
            'address' => $this->faker->address(),
            'latitude' => $this->faker->latitude(),
            'longitude' => $this->faker->longitude(),
            'city_id' => \App\Models\City::inRandomOrder()->first()->id,
            'category_id' => \App\Models\Category::inRandomOrder()->first()->id,
            'phone' => $this->faker->phoneNumber(),
            'website' => $this->faker->url(),
            'cover_image' => $this->faker->imageUrl(),
            'rating_avg' => $this->faker->randomFloat(1, 1, 5),
            'reviews_count' => $this->faker->numberBetween(0, 1000),
            'status' => $this->faker->boolean(80),
        ];
    }
}
