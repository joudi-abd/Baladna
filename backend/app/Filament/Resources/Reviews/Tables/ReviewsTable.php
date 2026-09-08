<?php

namespace App\Filament\Resources\Reviews\Tables;

use App\Models\Place;
use App\Models\Trip;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Contracts\View\View;

class ReviewsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([

                TextColumn::make('id')
                    ->label('#')
                    ->sortable(),

                TextColumn::make('user_id')
                    ->getStateUsing(function ($record) {
                        return $record->user?->name ?? '-';
                    })
                    ->label('User')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('reviewable_type')
                    ->label('Type')
                    ->formatStateUsing(function ($state) {
                        return match ($state) {
                            Place::class => 'Place',
                            Trip::class => 'Trip',
                            default => 'Unknown',
                        };
                    })
                    ->badge(),

                TextColumn::make('reviewable_name')
                    ->label('Place / Trip')
                    ->getStateUsing(function ($record) {
                        return match ($record->reviewable_type) {
                            Place::class => $record->reviewable?->name,
                            Trip::class => $record->reviewable?->title,
                            default => '-',
                        };
                    })
                    ->searchable(),

                TextColumn::make('rating')
                    ->label('Rating')
                    ->badge()
                    ->sortable(),

                TextColumn::make('comment')
                    ->limit(50)
                    ->tooltip(fn ($record) => $record->comment),

                TextColumn::make('created_at')
                    ->label('Created At')
                    ->dateTime()
                    ->sortable(),

            ])

            ->recordActions([
                ViewAction::make()
                    ->label('View'),
            ])

            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}