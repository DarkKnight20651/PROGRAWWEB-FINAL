<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class InstructorsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        for ($i = 1; $i <= 7; $i++) {
            DB::beginTransaction();

            $userId = DB::table('users')->insertGetId([
                'email' => 'instructor' . $i . '@example.com',
                'password' => Hash::make('12345678'),
                'role' => 'instructor',
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('instructors')->insert([
                [
                    'curp' => 'CURP_I' . $i,
                    'user_id' => $userId,
                    'telefono' => '1234567890',
                    'nombre' => 'NombreI' . $i,
                    'ape_p' => 'Apellido' . $i,
                    'ape_m' => 'Apellido' . $i,
                    'fecha_nac' => '1990-11-22',
                    'genero' => 1,
                ]
            ]);
            DB::commit();
        }
    }
}
