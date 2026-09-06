<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('trips', function (Blueprint $table) {
            $table->decimal('meeting_latitude', 10, 7)->nullable()->after('meeting_point');
            $table->decimal('meeting_longitude', 10, 7)->nullable()->after('meeting_latitude');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('trips', function (Blueprint $table) {
            $table->dropColumn(['meeting_latitude', 'meeting_longitude']);
            
        });
    }
};
