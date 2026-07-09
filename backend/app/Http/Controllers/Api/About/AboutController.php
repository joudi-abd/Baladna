<?php

namespace App\Http\Controllers\Api\About;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AboutController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'success' => true,
            'message' => 'About information retrieved successfully',
            'data' => [
                'title' => 'About ' . config('app.name'),
                'description' => 'Welcome to ' . config('app.name') . ', your go-to platform for discovering and sharing amazing places. Our mission is to connect people with the best experiences in their cities and beyond.',
                'email' => 'Baladna@gmail.com',
                'phone' => '+966 123 456 789',
            ],
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
