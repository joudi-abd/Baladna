<?php

namespace App\Filament\Resources\Features\Pages;

use App\Filament\Resources\Features\FeaturesResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditFeatures extends EditRecord
{
    protected static string $resource = FeaturesResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
