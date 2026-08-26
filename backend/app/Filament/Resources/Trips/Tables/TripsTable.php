<?php

namespace App\Filament\Resources\Trips\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class TripsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->searchable(),
                TextColumn::make('price')
                    ->money()
                    ->sortable(),
                TextColumn::make('trip_date')
                    ->date()
                    ->sortable(),
                TextColumn::make('max_participants')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('available_seats')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('transportation_type')
                    ->badge(),
                TextColumn::make('duration')
                    ->searchable(),
                TextColumn::make('meeting_point')
                    ->searchable(),
                ImageColumn::make('cover_image'),
                TextColumn::make('rating_avg')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('reviews_count')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('status')
                    ->badge(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
