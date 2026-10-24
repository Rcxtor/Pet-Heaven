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
        Schema::create('pets', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('species');
            $table->string('breed')->nullable();
            $table->string('age')->nullable();
            $table->string('location')->nullable();
            $table->enum('size',['small','medium','large'])->default('medium');
            $table->enum('gender', ['male', 'female']);
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->enum('status',['available','pending_adoption','adopted','removed'])->default('available');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pets');
    }
};
