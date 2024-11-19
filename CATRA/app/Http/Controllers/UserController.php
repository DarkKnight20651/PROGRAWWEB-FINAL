<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


use App\Models\User;

use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'role' => 'string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|confirmed|string|min:8',
        ]);

        $user = User::create([
            'role' => $validated["role"],
            'email' => $validated["email"],
            'password' => Hash::make($validated["password"]),
        ]);

        return response()->json($user, 201);
    }

    public function show($id)
    {
        return User::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'email' => ['required', 'email', 'unique:users,email,' . $request->user()->id],
            'role' => 'string|max:255',
        ]);

        $userUpdateData = [
            'email' => $validated['email'],
            'role' => $validated['role'],
        ];

        if (!empty($validated['password'])) {
            $userUpdateData['password'] = Hash::make($validated['password']);
        }

        $user->update($userUpdateData);

        return response()->json($user, 200);
    }

    public function destroy($id)
    {
        User::destroy($id);
        return response()->json(null, 204);
    }
}
