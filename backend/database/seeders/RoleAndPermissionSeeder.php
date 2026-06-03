<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        $permissions = [
            'create users',
            'edit users',
            'delete users',
            'view users',
            'block users',

            'create roles',
            'edit roles',
            'delete roles',
            'view roles',

            'create permissions',
            'edit permissions',
            'delete permissions', 
            'view permissions',
            'assign permissions',
            
            'create governorates',
            'edit governorates',
            'delete governorates',
            'view governorates',

            'create cities',
            'edit cities',
            'delete cities',
            'view cities',

            'create categories',
            'edit categories',
            'delete categories',
            'view categories',

            'create features',
            'edit features',
            'delete features',
            'view features',

            'create places',
            'edit places',
            'delete places',
            'view places',
            'publish places',

            'create trips',
            'edit trips',
            'delete trips',
            'view trips',
            'publish trips',

            'create reviews',
            'edit reviews',
            'delete reviews',
            'view reviews',

            'create favorites',
            'delete favorites',
            'view favorites',

            'view media',
            'delete media',
            'create media',

            'create bookings',
            'edit bookings',
            'delete bookings',
            'view bookings',
            'confirm bookings',
            'cancel bookings',

            'create payments',
            'view payments',
            'edit payments',
            'confirm payments',
            'refund payments',


            'view notifications',
            'delete notifications',
            'create notifications',
            'send notifications',
            
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' =>'web',
            ]);
        }

        // create roles 
        $admin = Role::firstOrCreate([
            'name' => 'admin',
            'guard_name' => 'web',
        ]);
        $admin->syncPermissions($permissions);

        $guid = Role::firstOrCreate([
            'name' => 'guid',
            'guard_name' => 'web',
        ]);
        $guid->syncPermissions([
            'view places',
            'view trips',
            'create trips',
            'edit trips',
            'delete trips',
            'publish trips',
            'view reviews',
            'view favorites',
            'view media',
            'view bookings',
            'view notifications',
            'create notifications',
        ]);

        $customer = Role::firstOrCreate([
            'name' => 'customer',
            'guard_name' => 'web',
        ]);
        $customer->syncPermissions([
            'view places',
            'view trips',
            'view reviews',
            'view favorites',
            'view media',
            'view bookings',
            'view notifications',
            'create bookings',
            'create payments',
            'create reviews',
            'create favorites',
            'cancel bookings',
            'delete favorites',
            'delete reviews',

        ]);
    }
}
