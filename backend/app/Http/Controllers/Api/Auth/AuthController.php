<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request){
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed'
        ]);

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password'])
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;



        return response()->json([
            'message' => "User registered successfully",
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function login(Request $request){
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        // Check email
        $user = User::where('email', $fields['email'])->first();

        // Check password
        if(!$user || !Hash::check($fields['password'], $user->password)){
            return response()->json([
                'message' => 'invalid credentials'
            ], 401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        return response()->json([
            "message"=> 'Login successful', 
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function logout(Request $request){
        auth()->user()->tokens()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ], 200);
    }

    public function me(Request $request){
        return response()->json([
            'user' => $request->user()
        ], 200);
    }
}
