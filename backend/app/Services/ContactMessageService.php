<?php 

namespace App\Services;
use App\Models\ContactMessage;
class ContactMessageService
{
    public function store(array $data)
    {
        return ContactMessage::create($data);
    }
}