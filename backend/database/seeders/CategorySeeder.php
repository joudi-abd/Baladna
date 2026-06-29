<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Restaurant',
            'Cafe',
            'Museum',
            'Park',
            'Shopping Mall',
            'Hotel',
            'Theater',
            'Historical Site',
            'Beach',
            'Nightlife',
        ];

        foreach ($categories as $name) {
            Category::firstOrCreate(['name' => $name]);
        }
    }
}
