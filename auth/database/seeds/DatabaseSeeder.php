<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        DB::table('oauth_clients')->insert([
            'id' => 999,
            'name' => 'OAUTH Demo app',
            'secret' => 'zhsWEfnOHgsOFMj1GinFri4mGihOKJ3IWB5ySHbs',
            'redirect' => 'https://front.127.0.0.1.xip.io/',
            'personal_access_client' => 0,
            'password_client' => 0,
            'revoked' => 0
    ]);
    }
}
