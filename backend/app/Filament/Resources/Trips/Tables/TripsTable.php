<?php

namespace App\Filament\Resources\Trips\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;

class TripsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([

                ImageColumn::make('cover_image')
                    ->label('Image')
                    ->disk('public')
                    ->square(),

                TextColumn::make('title')
                    ->label('Title')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('price')
                    ->label('Price')
                    ->numeric(decimalPlaces: 2)
                    ->sortable(),

                TextColumn::make('trip_date')
                    ->label('Trip Date')
                    ->date()
                    ->sortable(),

                TextColumn::make('max_participants')
                    ->label('Max Participants')
                    ->sortable(),

                TextColumn::make('available_seats')
                    ->label('Available Seats')
                    ->sortable(),

                TextColumn::make('transportation_type')
                    ->label('Transportation')
                    ->badge(),

                TextColumn::make('duration')
                    ->label('Duration')
                    ->searchable(),

                TextColumn::make('meeting_point')
                    ->label('Meeting Point')
                    ->searchable()
                    ->limit(30),

                TextColumn::make('rating_avg')
                    ->label('Rating')
                    ->numeric(decimalPlaces: 2)
                    ->sortable(),

                TextColumn::make('reviews_count')
                    ->label('Reviews')
                    ->sortable(),

                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->sortable(),

                TextColumn::make('created_at')
                    ->label('Created At')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('updated_at')
                    ->label('Updated At')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])

            ->filters([

                SelectFilter::make('status')
                    ->options([
                        'upcoming' => 'Upcoming',
                        'ongoing' => 'Ongoing',
                        'completed' => 'Completed',
                        'cancelled' => 'Cancelled',
                    ]),

                SelectFilter::make('transportation_type')
                    ->options([
                        'bus' => 'Bus',
                        'mini_bus' => 'Mini Bus',
                        'train' => 'Train',
                        'tour_bus' => 'Tour Bus',
                    ]),

                Filter::make('upcoming')
                    ->label('Upcoming Trips')
                    ->query(fn (Builder $query): Builder =>
                        $query->where('status', 'upcoming')
                    ),
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