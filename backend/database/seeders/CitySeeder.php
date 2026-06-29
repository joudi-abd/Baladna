<?php

namespace Database\Seeders;

use App\Models\City;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // You can either hardcode cities or generate them dynamically
        $cities = [
            ['name' => 'Damascus', 'governorate_id' => 1],
            ['name' => 'Rif Dimashq', 'governorate_id' => 2],
            ['name' => 'Aleppo', 'governorate_id' => 3],
            ['name' => 'Homs', 'governorate_id' => 4],
            ['name' => 'Hama', 'governorate_id' => 5],
            ['name' => 'Latakia', 'governorate_id' => 6],
            ['name' => 'Tartus', 'governorate_id' => 7],
            ['name' => 'Idlib', 'governorate_id' => 8],
            ['name' => 'Deir ez-Zor', 'governorate_id' => 9],
            ['name' => 'Al-Hasakah', 'governorate_id' => 10],
            ['name' => 'Raqqa', 'governorate_id' => 11],
            ['name' => 'Daraa', 'governorate_id' => 12],
            ['name' => 'As-Suwayda', 'governorate_id' => 13],
            ['name' => 'Quneitra', 'governorate_id' => 14],
        ];

        foreach ($cities as $city) {
            City::firstOrCreate(['name' => $city['name']], ['governorate_id' => $city['governorate_id']]);
        }
    }
}
