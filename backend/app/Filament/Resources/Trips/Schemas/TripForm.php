<?php

namespace App\Filament\Resources\Trips\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class TripForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required(),
                Textarea::make('description')
                    ->columnSpanFull(),
                TextInput::make('price')
                    ->required()
                    ->numeric()
                    ->prefix('$'),
                DatePicker::make('trip_date')
                    ->required(),
                Select::make('places')
                    ->label('Trip Places')
                    ->relationship('places', 'name')
                    ->multiple()
                    ->searchable()
                    ->preload(),
                TextInput::make('max_participants')
                    ->required()
                    ->numeric(),
                TextInput::make('available_seats')
                    ->required()
                    ->numeric(),
                Select::make('transportation_type')
                    ->options(['bus' => 'Bus', 'mini_bus' => 'Mini bus', 'train' => 'Train', 'tour_bus' => 'Tour bus']),
                TextInput::make('duration'),
                TextInput::make('meeting_point'),
                TextInput::make('meeting_latitude')
                    ->numeric()
                    ->label('Meeting Latitude'),
                TextInput::make('meeting_longitude')
                    ->numeric()
                    ->label('Meeting Longitude'),
                FileUpload::make('cover_image')
                    ->image(),
                
                Select::make('status')
                    ->options([
            'upcoming' => 'Upcoming',
            'ongoing' => 'Ongoing',
            'completed' => 'Completed',
            'cancelled' => 'Cancelled',
        ])
                    ->default('upcoming')
                    ->required(),
            ]);
    }
}
