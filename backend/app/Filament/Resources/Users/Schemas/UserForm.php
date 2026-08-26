<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Hash;


class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->required(),
                // DateTimePicker::make('email_verified_at'),
                TextInput::make('password')
                    ->password()
                    ->required(fn (string $operation): bool => $operation === 'create') //يعني ان حقل الباسورد مطلوب فقط عندما تكون العملية هي إنشاء
                    ->dehydrated(fn ($state) => filled($state)) //يعني اذا كان الحقل يحتوي قيمة يتم ارسالها لتخزينها واذا كان فارغ لا يتم استبدال القيمة السابقة بفراغ(ترسل قيمة جديدة فقط عند وجود قيمة في الحقل )
                    ->dehydrateStateUsing(fn ($state) => Hash::make($state)) // اذا وجدت قيمة في الحقل فهو قبل ان يحفظهها يقوم بتشفيرها
                    ->hidden(fn (string $operation): bool => $operation === 'edit'), // الحقل يكون مخفي عندما تكون العملية هي تعديل
                    TextInput::make('phone')
                    ->tel(),
                    Select::make('status')
                    ->options(['active' => 'Active', 'inactive' => 'Inactive'])
                    ->default('active')
                    ->required(),
                    Select::make('roles')
                    ->multiple()
                    ->relationship('roles', 'name')
                    ->preload()
                    ->searchable(),
                    Toggle::make('is_super_admin')
                        ->required(),
            ]);
    }
}
