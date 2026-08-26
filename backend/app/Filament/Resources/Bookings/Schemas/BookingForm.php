<?php

namespace App\Filament\Resources\Bookings\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class BookingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('user_id')
                    ->required()
                    ->numeric(),
                TextInput::make('trip_id')
                    ->required()
                    ->numeric(),
                TextInput::make('total_price')
                    ->required()
                    ->numeric()
                    ->prefix('$'),
                Select::make('status')
                    ->options([
            'pending' => 'Pending',
            'confirmed' => 'Confirmed',
            'cancelled' => 'Cancelled',
            'completed' => 'Completed',
        ])
                    ->default('pending')
                    ->required(),
                TextInput::make('participants_count')
                    ->required()
                    ->numeric()
                    ->default(1),
                Textarea::make('notes')
                    ->columnSpanFull(),
            ]);
    }
}
