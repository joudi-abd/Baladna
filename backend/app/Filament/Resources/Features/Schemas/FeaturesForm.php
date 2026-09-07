<?php

namespace App\Filament\Resources\Features\Schemas;

use Faker\Provider\ar_EG\Text;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class FeaturesForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required()
                    ->maxLength(255)
                    ->unique(ignoreRecord:true),
            ]);
    }
}
