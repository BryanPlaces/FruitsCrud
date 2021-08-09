<?php

namespace App\Http\Controllers;

use App\Models\Fruit;
use Illuminate\Http\Request;
use App\Http\Requests\FruitRequest;
use App\Http\Resources\FruitResource;

class FruitController extends Controller
{
    public function index()
    {
        $fruits = Fruit::orderBy('id', 'desc')->get();
        $fruits_collect = FruitResource::collection($fruits);

        return response()->json($fruits_collect);
    }

    public function store(FruitRequest $request)
    {
        $fruit = Fruit::create($request->all());
        return response()->json($fruit);
    }

    public function show(Fruit $fruit)
    {
        return response()->json($fruit);
    }

    public function update(Request $request, Fruit $fruit)
    {
        $fruit->update($request->all());
        return response()->json($fruit);
    }

    public function destroy(Fruit $fruit)
    {
        $fruit->delete();
        return true;
    }
}
