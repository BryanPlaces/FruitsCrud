<?php

namespace Tests\Feature\app\Http\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class FruitControllerTest extends TestCase
{
    public function testUpdate()
    {
        $fruit = \App\Models\Fruit::factory()->create();
        $this->putJson("/api/fruits/".$fruit->id,
            [
                'name' => 'edit name color',
                'size' => 1,
                'color' => '#fefefe',
            ])
        ->assertStatus(200)
        ->assertJsonFragment(
            [
                'name' => 'edit name color',
                'size' => 1,
                'color' => '#fefefe',
            ]);
    }
}
