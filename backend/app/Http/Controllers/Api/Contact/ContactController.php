<?php

namespace App\Http\Controllers\Api\Contact;

use App\Http\Controllers\Controller;
use App\Http\Requests\contact\ContactRequest;
use App\Http\Resources\ContactMessageResource;
use App\Models\ContactMessage;
use App\Services\ContactMessageService;

use Illuminate\Http\Request;
use Mail;

class ContactController extends Controller
{
    public function __construct(private ContactMessageService $contactMessageService)
    {
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $messages = ContactMessage::all();
        return response()->json([
            'success' => true,
            'message' => 'Contact messages retrieved successfully', 
            'data' => ContactMessageResource::collection($messages)
            ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ContactRequest $request)
    {
        $message = $this->contactMessageService->store($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Contact message sent successfully', 
            'data' => ContactMessageResource::collection([$message])
            ], 201);
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
