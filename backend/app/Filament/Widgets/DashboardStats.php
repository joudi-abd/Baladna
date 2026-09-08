<?php

namespace App\Filament\Widgets;

use App\Models\Booking;
use App\Models\Payment;
use App\Models\Place;
use App\Models\Review;
use App\Models\Trip;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class DashboardStats extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        return [

            Stat::make('Total Users', User::count())
                ->description('All registered users')
                ->icon('heroicon-o-users'),

            Stat::make('Total Places', Place::count())
                ->description('All places')
                ->icon('heroicon-o-map-pin'),

            Stat::make('Total Trips', Trip::count())
                ->description('All trips')
                ->icon('heroicon-o-paper-airplane'),

            Stat::make('Total Bookings', Booking::count())
                ->description('All bookings')
                ->icon('heroicon-o-calendar-days'),

            Stat::make(
                'Completed Payments',
                Payment::where('status', 'completed')->count()
            )
                ->description('Successful payments')
                ->icon('heroicon-o-credit-card'),

            Stat::make('Total Reviews', Review::count())
                ->description('All reviews')
                ->icon('heroicon-o-star'),

        ];
    }
}