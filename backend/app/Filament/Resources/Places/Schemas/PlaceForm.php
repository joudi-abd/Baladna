<?php

namespace App\Filament\Resources\Places\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class PlaceForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                TextInput::make('name')
                    ->label('Place Name')
                    ->required()
                    ->maxLength(255),

                Textarea::make('description')
                    ->label('Description')
                    ->rows(5)
                    ->columnSpanFull(),

                TextInput::make('address')
                    ->label('Address')
                    ->maxLength(255),

                Select::make('city_id')
                    ->label('City')
                    ->relationship('city', 'name')
                    ->searchable()
                    ->preload()
                    ->required(),

                Select::make('category_id')
                    ->label('Category')
                    ->relationship('category', 'name')
                    ->searchable()
                    ->preload()
                    ->required(),
                Select::make('features')
                    ->label('Features')
                    ->relationship('features', 'name')
                    ->multiple()
                    ->searchable()
                    ->preload(),

                TextInput::make('latitude')
                    ->label('Latitude')
                    ->numeric()
                    ->step(0.0000001),

                TextInput::make('longitude')
                    ->label('Longitude')
                    ->numeric()
                    ->step(0.0000001),

                TextInput::make('phone')
                    ->label('Phone')
                    ->tel()
                    ->maxLength(20),



                TextInput::make('website')
                    ->label('Website')
                    ->url()
                    ->maxLength(255),

                FileUpload::make('cover_image')
                    ->label('Cover Image')
                    ->image()
                    ->disk('public')
                    ->directory('places')
                    ->imageEditor(),

                Toggle::make('status')
                    ->label('Active')
                    ->default(true)
                    ->required(),
            ])
            ->columns(2);
    }
}