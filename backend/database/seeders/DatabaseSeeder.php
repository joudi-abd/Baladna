<?php

namespace Database\Seeders;

use App\Models\User;
use Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'joudi',
            'email' => 'joudi@gmail.com',
            'password' => Hash::make('password'),
            'is_super_admin' => true,
        ]);

        $this->call([
            RoleAndPermissionSeeder::class,
            GovernorateSeeder::class,
            CitySeeder::class,
            CategorySeeder::class,
            FeatureSeeder::class,
            PlaceSeeder::class,
            TripSeeder::class,
        ]);
    }
}
