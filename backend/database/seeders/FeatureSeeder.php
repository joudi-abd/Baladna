<?php

namespace Database\Seeders;

use App\Models\Feature;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FeatureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $features = [
            'Free Wi-Fi',
            'Parking Available',
            'Wheelchair Accessible',
            'Pet Friendly',
            'Outdoor Seating',
            'Live Music',
            'Family Friendly',
            'Vegetarian Options',
            'Vegan Options',
            'Gluten-Free Options',
        ];

        foreach ($features as $name) {
            Feature::firstOrCreate(['name' => $name]);
        }
    }
}
