<?php

namespace Database\Seeders;

use App\Models\Governorate;
use Illuminate\Database\Seeder;

class GovernorateSeeder extends Seeder
{
    public function run(): void
    {
        $governorates = [
            'دمشق',
            'ريف دمشق',
            'حلب',
            'حمص',
            'حماة',
            'اللاذقية',
            'طرطوس',
            'إدلب',
            'درعا',
            'دير الزور',
            'الحسكة',
            'الرقة',
            'القنيطرة',
            'السويداء',
        ];

        foreach ($governorates as $name) {
            Governorate::firstOrCreate([
                'name' => $name,
            ]);
        }
    }
}