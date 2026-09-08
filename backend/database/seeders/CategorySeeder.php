<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [

            [
                'name' => 'مواقع تاريخية',
                'icon' => 'heroicon-o-building-library',
            ],

            [
                'name' => 'قلاع',
                'icon' => 'heroicon-o-shield-check',
            ],

            [
                'name' => 'أماكن دينية',
                'icon' => 'heroicon-o-building-office-2',
            ],

            [
                'name' => 'أماكن طبيعية',
                'icon' => 'heroicon-o-globe-alt',
            ],

            [
                'name' => 'متحف',
                'icon' => 'heroicon-o-building-library',
            ],
                

            [
                'name' => 'شواطئ',
                'icon' => 'heroicon-o-sun',
            ],

            [
                'name' => 'أماكن أثرية',
                'icon' => 'heroicon-o-map',
            ],
            [
                'name' => 'حدائق ومساحات خضراء',
                'icon' => 'heroicon-o-sparkles',
            ],

            [
                'name' => 'مراكز ثقافية',
                'icon' => 'heroicon-o-academic-cap',
            ],

            [
                'name' => 'مراكز تسوق',
                'icon' => 'heroicon-o-shopping-bag',
            ],

            [
                'name' => 'مطاعم ومقاهي',
                'icon' => 'heroicon-o-cake',
            ],
            [
                'name' => 'مغامرات والرياضة',
                'icon' => 'heroicon-o-lightning-bolt',
            ],

            [
                'name' => 'الفعاليات والمناسبات',
                'icon' => 'heroicon-o-calendar',
            ],
        ];

        foreach ($categories as $category) {

            Category::firstOrCreate(
                ['name' => $category['name']],
                $category
            );
        }
    }
}