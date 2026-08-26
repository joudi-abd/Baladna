<?php

namespace App\Filament\Resources\Places\Schemas;

use Filament\Forms\Components\FileUpload;
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
                    ->required(),
                Textarea::make('description')
                    ->columnSpanFull(),
                TextInput::make('address'),
                TextInput::make('latitude')
                    ->numeric(),
                TextInput::make('longitude')
                    ->numeric(),
                TextInput::make('city_id')
                    ->required()
                    ->numeric(),
                TextInput::make('category_id')
                    ->required()
                    ->numeric(),
                TextInput::make('phone')
                    ->tel(),
                TextInput::make('website')
                    ->url(),
                FileUpload::make('cover_image')
                    ->image(),
                TextInput::make('rating_avg')
                    ->required()
                    ->numeric()
                    ->default(0.0),
                TextInput::make('reviews_count')
                    ->required()
                    ->numeric()
                    ->default(0),
                Toggle::make('status')
                    ->required(),
            ]);
    }
}
