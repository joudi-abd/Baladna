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
        Schema::create('trips', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->date('trip_date');
            $table->unsignedInteger('max_participants');
            $table->unsignedInteger('available_seats');
            $table->enum('transportation_type', ['bus', 'mini_bus' , 'train' , 'tour_bus' ])->nullable(); 
            $table->string('duration')->nullable();
            $table->string('meeting_point')->nullable();

            $table->string('cover_image')->nullable();

            $table->decimal('rating_avg', 3, 2)->default(0);
            $table->unsignedInteger('reviews_count')->default(0);

            $table->enum('status', ['upcoming', 'ongoing', 'completed', 'cancelled'])->default('upcoming');

            $table->timestamps();

            // Indexes مفيدة للأداء
            $table->index(['trip_date', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trips');
    }
};
