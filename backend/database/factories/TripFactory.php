<?php

namespace Database\Factories;

use App\Models\Trip;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Trip>
 */
class TripFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'cover_image' => $this->faker->imageUrl(),
            'duration' => $this->faker->numberBetween(1, 14), // Duration in days
            'price' => $this->faker->randomFloat(2, 100, 5000), // Price in dollars
            'trip_date' => $this->faker->dateTimeBetween('now', '+1 year'),
            'max_participants' => $this->faker->numberBetween(5, 50),
            'available_seats' => $this->faker->numberBetween(0, 50),
            'transportation_type' => $this->faker->randomElement(['bus', 'mini_bus', 'train', 'tour_bus']),
            'meeting_point' => $this->faker->address(),
            'rating_avg' => $this->faker->randomFloat(1, 1, 5),
            'reviews_count' => $this->faker->numberBetween(0, 1000),
            'status' => $this->faker->randomElement(['upcoming', 'ongoing', 'completed', 'cancelled']),
        ];
    }
}
