<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $fillable = [
        'mediable_id',
        'mediable_type', 
        'file_path', 
        'file_type', 
        'is_cover'
    ];

    protected $casts = [
        'is_cover' => 'boolean',
    ];

    public function mediable()
    {
        return $this->morphTo();
    }

}
