<?php

namespace App\Filament\Resources\Payments\Tables;

use App\Services\PaymentService;
use Filament\Actions\Action;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Notifications\Notification;
use Filament\Tables\Table;

class PaymentsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([

                TextColumn::make('id')
                    ->label('#')
                    ->sortable(),

                TextColumn::make('booking.user.name')
                    ->label('User')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('booking.trip.title')
                    ->label('Trip')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('amount')
                    ->label('Amount')
                    ->numeric(decimalPlaces: 2)
                    ->sortable(),

                TextColumn::make('payment_method')
                    ->label('Payment Method')
                    ->badge(),

                ImageColumn::make('proof_image')
                    ->label('Proof')
                    ->disk('public'),

                TextColumn::make('status')
                    ->badge()
                    ->sortable(),

                TextColumn::make('paid_at')
                    ->label('Paid At')
                    ->date()
                    ->sortable(),

                TextColumn::make('created_at')
                    ->label('Created At')
                    ->dateTime()
                    ->sortable(),
            ])

            ->filters([

                SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'completed' => 'Completed',
                        'failed' => 'Failed',
                    ]),

                SelectFilter::make('payment_method')
                    ->options([
                        'sham_cash' => 'Sham Cash',
                        'bank_transfer' => 'Bank Transfer',
                        'cash_on_arrival' => 'Cash On Arrival',
                    ]),
            ])

            ->recordActions([

                Action::make('approve')
                    ->label('Approve')
                    ->icon('heroicon-o-check-circle')
                    ->requiresConfirmation()
                    ->visible(fn ($record) =>
                        $record->status === 'pending'
                    )
                    ->action(function ($record) {

                        app(PaymentService::class)
                            ->approvePayment($record);
                    }),

                Action::make('reject')
                    ->label('Reject')
                    ->icon('heroicon-o-x-circle')
                    ->requiresConfirmation()
                    ->visible(fn ($record) =>
                        $record->status === 'pending'
                    )
                    ->action(function ($record) {

                        app(PaymentService::class)
                            ->rejectPayment($record);
                    }),
            ]);
    }
}