<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


use App\Models\User;

use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index() {
        return User::all();
    }

    public function store(Request $request) {
        $request->validate([
            'role' => 'string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|confirmed|string|min:8',
        ]);
        
        $user = User::create([
           'role'=>$request->role,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        
        return response()->json($user, 201);
    }

    public function show($id) {
        return User::findOrFail($id);
    }

    public function update(Request $request, $id) {
        $user = User::findOrFail($id);

        $request->validate([
            'role'=> 'string|max:255',
            'email' => 'string|email|max:255|unique:users,email',
        ]);

        $user->update($request->only(['email','role']));

        if ($request->password) {
            $user->password = Hash::make($request->password);
            $user->save();
        }

        return response()->json($user, 200);
    }

    public function destroy($id) {
        User::destroy($id);
        return response()->json(null, 204);
    }
}
