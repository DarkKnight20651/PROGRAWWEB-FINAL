<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersAdminOrSecreWithoutClienteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'email' => 'admin1@example.com',
                'password' => Hash::make('12345678'),
                'role' => 'admin',
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        for ($i = 1; $i <= 6; $i++) {
            DB::table('users')->insert([
                [
                    'email' => 'secre' . $i . '@example.com',
                    'password' => Hash::make('12345678'),
                    'role' => 'secre',
                    'email_verified_at' => now(),
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);
        }
    }
}
