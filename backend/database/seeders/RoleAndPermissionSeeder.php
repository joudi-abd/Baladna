<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleAndPermissionSeeder extends Seeder
{
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]
            ->forgetCachedPermissions();

        /*
        |--------------------------------------------------------------------------
        | Permissions
        |--------------------------------------------------------------------------
        */

        $permissions = [

            // Users
            'create users',
            'edit users',
            'delete users',
            'view users',
            'block users',

            // Roles
            'create roles',
            'edit roles',
            'delete roles',
            'view roles',

            // Permissions
            'create permissions',
            'edit permissions',
            'delete permissions',
            'view permissions',
            'assign permissions',

            // Governorates
            'create governorates',
            'edit governorates',
            'delete governorates',
            'view governorates',

            // Cities
            'create cities',
            'edit cities',
            'delete cities',
            'view cities',

            // Categories
            'create categories',
            'edit categories',
            'delete categories',
            'view categories',

            // Features
            'create features',
            'edit features',
            'delete features',
            'view features',

            // Places
            'create places',
            'edit places',
            'delete places',
            'view places',
            'publish places',

            // Trips
            'create trips',
            'edit trips',
            'delete trips',
            'view trips',
            'publish trips',

            // Reviews
            'create reviews',
            'edit reviews',
            'delete reviews',
            'view reviews',

            // Favorites
            'create favorites',
            'delete favorites',
            'view favorites',

            // Media
            'create media',
            'delete media',
            'view media',

            // Bookings
            'create bookings',
            'edit bookings',
            'delete bookings',
            'view bookings',
            'confirm bookings',
            'cancel bookings',

            // Payments
            'create payments',
            'view payments',
            'edit payments',
            'confirm payments',
            'reject payments',
            'refund payments',

            // Notifications
            'view notifications',
            'delete notifications',
            'create notifications',
            'send notifications',
        ];

        /*
        |--------------------------------------------------------------------------
        | Create Permissions
        |--------------------------------------------------------------------------
        */

        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web',
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Admin Role
        |--------------------------------------------------------------------------
        */

        $admin = Role::firstOrCreate([
            'name' => 'admin',
            'guard_name' => 'web',
        ]);

        $admin->syncPermissions($permissions);

        /*
        |--------------------------------------------------------------------------
        | Customer Role
        |--------------------------------------------------------------------------
        */

        $customer = Role::firstOrCreate([
            'name' => 'customer',
            'guard_name' => 'web',
        ]);
        $customer->syncPermissions([

            // Places & Trips
            'view places',
            'view trips',

            // Reviews
            'view reviews',
            'create reviews',
            'edit reviews',
            'delete reviews',

            // Favorites
            'view favorites',
            'create favorites',
            'delete favorites',

            // Media
            'view media',

            // Bookings
            'view bookings',
            'create bookings',
            'edit bookings',
            'cancel bookings',

            // Payments
            'create payments',

            // Notifications
            'view notifications',
        ]);
    }
}