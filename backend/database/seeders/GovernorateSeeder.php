<?php

namespace Database\Seeders;

use App\Models\Governorate;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GovernorateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $governorates = [
            'Damascus',
            'Rif Dimashq',
            'Aleppo',
            'Homs',
            'Hama',
            'Latakia',
            'Tartus',
            'Idlib',
            'Deir ez-Zor',
            'Al-Hasakah',
            'Raqqa',
            'Daraa',
            'As-Suwayda',
            'Quneitra',
        ];

        foreach ($governorates as $name) {
            Governorate::firstOrCreate(['name' => $name]);
        }
    }
}
