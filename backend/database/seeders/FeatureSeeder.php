<?php

namespace Database\Seeders;

use App\Models\Feature;
use Illuminate\Database\Seeder;

class FeatureSeeder extends Seeder
{
    public function run(): void
    {
        $features = [

            'مواقف سيارات',

            'مطاعم',

            'مقاهي',

            'مرشد سياحي',

            'ممرات',

            'Wi-Fi وايفاي',

            'مناسب للعائلات',

            'التصوير مسموح',

            'مناسب لذوي الإعاقة',

            'متجر الهدايا',

            'مناظر طبيعية',

            'جولات تاريخية',
            'إطلالة جميلة',
        ];

        foreach ($features as $name) {

            Feature::firstOrCreate([
                'name' => $name,
            ]);
        }
    }
}