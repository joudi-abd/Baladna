<?php

namespace Database\Seeders;

use App\Models\Trip;
use App\Models\Place;
use Illuminate\Database\Seeder;

class TripPlaceSeeder extends Seeder
{
    public function run(): void
    {
        $trips = [

            'جولة سياحية في دمشق القديمة' => [
                'الجامع الأموي',
                'قصر العظم',
                'قلعة دمشق',
                'خان أسعد باشا',
            ],

            'رحلة إلى مدينة حلب القديمة' => [
                'قلعة حلب',
                'مدينة حلب القديمة',
                'الجامع الكبير في حلب',
                'باب الفرج',
            ],

            'رحلة إلى قلعة الحصن' => [
                'قلعة الحصن',
            ],

            'رحلة تدمر الأثرية' => [
                'الموقع الأثري في تدمر',
                'معبد بل',
                'قلعة فخر الدين',
            ],

            'رحلة نواعير حماة وأفاميا' => [
                'نواعير حماة',
                'أفاميا',
            ],

            'رحلة معلولا وصيدنايا' => [
                'معلولا',
                'صيدنايا',
            ],

            'رحلة بصرى الشام' => [
                'مدينة بصرى الشام القديمة',
                'المسرح الروماني في بصرى',
            ],

            'رحلة الساحل السوري' => [
                'ساحل اللاذقية',
                'أوغاريت',
                'قلعة صلاح الدين',
            ],

            'رحلة جزيرة أرواد وطرطوس' => [
                'جزيرة أرواد',
                'مدينة طرطوس القديمة',
            ],

        ];

        foreach ($trips as $tripTitle => $placeNames) {

            $trip = Trip::where('title', $tripTitle)->firstOrFail();

            foreach ($placeNames as $order => $placeName) {

                $place = Place::where('name', $placeName)->firstOrFail();

                $trip->places()->syncWithoutDetaching([
                    $place->id => [
                        'order_no' => $order + 1,
                    ],
                ]);
            }
        }
    }
}