<?php

namespace Database\Seeders;

use App\Models\Trip;
use Illuminate\Database\Seeder;

class TripSeeder extends Seeder
{
    public function run(): void
    {
        $trips = [

            [
                'title' => 'جولة سياحية في دمشق القديمة',
                'description' => 'رحلة سياحية لاستكشاف أبرز المعالم التاريخية والدينية في مدينة دمشق القديمة، بما في ذلك الجامع الأموي وقصر العظم وخان أسعد باشا.',
                'price' => 25.00,
                'trip_date' => '2026-10-10',
                'max_participants' => 30,
                'available_seats' => 30,
                'transportation_type' => 'tour_bus',
                'duration' => 'يوم واحد',
                'meeting_point' => 'ساحة الأمويين - دمشق',
                'meeting_latitude' => 33.5138,
                'meeting_longitude' => 36.2765,
                'cover_image' => 'images/جولة سياحية في دمشق القديمة.jpg',
                'rating_avg' => 0,
                'reviews_count' => 0,
                'status' => 'upcoming',
            ],

            [
                'title' => 'رحلة إلى مدينة حلب القديمة',
                'description' => 'رحلة لاستكشاف مدينة حلب القديمة ومعالمها التاريخية، وزيارة قلعة حلب والجامع الكبير والأسواق القديمة.',
                'price' => 35.00,
                'trip_date' => '2026-10-17',
                'max_participants' => 25,
                'available_seats' => 25,
                'transportation_type' => 'tour_bus',
                'duration' => 'يوم واحد',
                'meeting_point' => 'ساحة سعد الله الجابري - حلب',
                'meeting_latitude' => 36.2021,
                'meeting_longitude' => 37.1575,
                'cover_image' => 'images/رحلة إلى مدينة حلب القديمة.jpg',
                'rating_avg' => 0,
                'reviews_count' => 0,
                'status' => 'upcoming',
            ],

            [
                'title' => 'رحلة إلى قلعة الحصن',
                'description' => 'رحلة سياحية إلى قلعة الحصن للتعرف على تاريخها والاستمتاع بالمناظر الطبيعية المحيطة بها.',
                'price' => 30.00,
                'trip_date' => '2026-10-24',
                'max_participants' => 30,
                'available_seats' => 30,
                'transportation_type' => 'tour_bus',
                'duration' => 'يوم واحد',
                'meeting_point' => 'ساحة الساعة - حمص',
                'meeting_latitude' => 34.7320,
                'meeting_longitude' => 36.7130,
                'cover_image' => 'images/رحلة إلى قلعة الحصن.jpg',
                'rating_avg' => 0,
                'reviews_count' => 0,
                'status' => 'upcoming',
            ],

            [
                'title' => 'رحلة تدمر الأثرية',
                'description' => 'رحلة لاكتشاف مدينة تدمر الأثرية ومعالمها التاريخية الشهيرة ومعبد بل وآثار المدينة القديمة.',
                'price' => 40.00,
                'trip_date' => '2026-11-01',
                'max_participants' => 25,
                'available_seats' => 25,
                'transportation_type' => 'tour_bus',
                'duration' => 'يومان',
                'meeting_point' => 'ساحة الساعة - حمص',
                'meeting_latitude' => 34.7320,
                'meeting_longitude' => 36.7130,
                'cover_image' => 'images/رحلة تدمر الأثرية.jpg',
                'rating_avg' => 0,
                'reviews_count' => 0,
                'status' => 'upcoming',
            ],

            [
                'title' => 'رحلة نواعير حماة وأفاميا',
                'description' => 'رحلة تجمع بين زيارة نواعير حماة التاريخية واستكشاف الموقع الأثري لمدينة أفاميا.',
                'price' => 30.00,
                'trip_date' => '2026-11-08',
                'max_participants' => 30,
                'available_seats' => 30,
                'transportation_type' => 'mini_bus',
                'duration' => 'يوم واحد',
                'meeting_point' => 'ساحة العاصي - حماة',
                'meeting_latitude' => 35.1318,
                'meeting_longitude' => 36.7578,
                'cover_image' => 'images/رحلة نواعير حماة وأفاميا.jpg',
                'rating_avg' => 0,
                'reviews_count' => 0,
                'status' => 'upcoming',
            ],
            [
                'title' => 'رحلة معلولا وصيدنايا',
                'description' => 'رحلة سياحية إلى بلدتي معلولا وصيدنايا للتعرف على التراث التاريخي والديني والاستمتاع بالمناظر الجبلية.',
                'price' => 25.00,
                'trip_date' => '2026-11-15',
                'max_participants' => 30,
                'available_seats' => 30,
                'transportation_type' => 'mini_bus',
                'duration' => 'يوم واحد',
                'meeting_point' => 'ساحة الأمويين - دمشق',
                'meeting_latitude' => 33.5138,
                'meeting_longitude' => 36.2765,
                'cover_image' => 'images/رحلة معلولا وصيدنايا.jpg',
                'rating_avg' => 0,
                'reviews_count' => 0,
                'status' => 'upcoming',
            ],

            [
                'title' => 'رحلة بصرى الشام',
                'description' => 'رحلة إلى مدينة بصرى الشام الأثرية لزيارة المسرح الروماني والتعرف على تاريخ المدينة ومعالمها القديمة.',
                'price' => 35.00,
                'trip_date' => '2026-11-22',
                'max_participants' => 25,
                'available_seats' => 25,
                'transportation_type' => 'tour_bus',
                'duration' => 'يوم واحد',
                'meeting_point' => 'مركز مدينة درعا',
                'meeting_latitude' => 32.6189,
                'meeting_longitude' => 36.1021,
                'cover_image' => 'images/رحلة بصرى الشام.jpg',
                'rating_avg' => 0,
                'reviews_count' => 0,
                'status' => 'upcoming',
            ],

            [
                'title' => 'رحلة الساحل السوري',
                'description' => 'رحلة سياحية لاستكشاف ساحل اللاذقية والاستمتاع بالشواطئ والمناظر البحرية والطبيعة الساحلية.',
                'price' => 35.00,
                'trip_date' => '2026-12-05',
                'max_participants' => 30,
                'available_seats' => 30,
                'transportation_type' => 'tour_bus',
                'duration' => 'يومان',
                'meeting_point' => 'ساحة أوغاريت - اللاذقية',
                'meeting_latitude' => 35.5138,
                'meeting_longitude' => 35.7780,
                'cover_image' => 'images/رحلة الساحل السوري.jpg',
                'rating_avg' => 0,
                'reviews_count' => 0,
                'status' => 'upcoming',
            ],

            [
                'title' => 'رحلة جزيرة أرواد وطرطوس',
                'description' => 'رحلة سياحية تجمع بين زيارة جزيرة أرواد واستكشاف مدينة طرطوس القديمة والاستمتاع بالمناظر الساحلية.',
                'price' => 35.00,
                'trip_date' => '2026-12-12',
                'max_participants' => 30,
                'available_seats' => 30,
                'transportation_type' => 'tour_bus',
                'duration' => 'يوم واحد',
                'meeting_point' => 'مدينة طرطوس',
                'meeting_latitude' => 34.8900,
                'meeting_longitude' => 35.8860,
                'cover_image' => 'images/رحلة جزيرة أرواد وطرطوس.jpg',
                'rating_avg' => 0,
                'reviews_count' => 0,
                'status' => 'upcoming',
            ],

        ];

        foreach ($trips as $trip) {
            Trip::firstOrCreate(
                [
                    'title' => $trip['title'],

                ],
                $trip
            );
        }
    }
}