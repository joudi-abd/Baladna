<?php

namespace App\Filament\Resources\Reviews\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class ReviewsForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                TextInput::make('user_id')
                    ->label('User')
                    ->disabled()
                    ->dehydrated(false),

                TextInput::make('reviewable_type')
                    ->label('Review Type')
                    ->formatStateUsing(function ($state) {
                        return match ($state) {
                            'App\Models\Place' => 'Place',
                            'App\Models\Trip' => 'Trip',
                            default => $state,
                        };
                    })
                    ->disabled()
                    ->dehydrated(false),

                TextInput::make('reviewable_id')
                    ->label('Reviewable ID')
                    ->disabled()
                    ->dehydrated(false),

                TextInput::make('rating')
                    ->disabled()
                    ->dehydrated(false),

                Textarea::make('comment')
                    ->disabled()
                    ->dehydrated(false)
                    ->columnSpanFull(),

            ]);
    }
}