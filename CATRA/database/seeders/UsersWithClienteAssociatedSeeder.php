<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersWithClienteAssociatedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i <= 15; $i++) {
            DB::beginTransaction();

            $userId = DB::table('users')->insertGetId([
                'email' => 'cliente' . $i . '@example.com',
                'password' => Hash::make('12345678'),
                'role' => 'cliente',
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('clientes')->insert([
                [
                    'curp' => 'CURP_' . $i,
                    'user_id' => $userId,
                    'telefono' => '1234567890',
                    'nombre' => 'Nombre' . $i,
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
