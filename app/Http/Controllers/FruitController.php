<?php

namespace App\Http\Controllers;

use App\Models\Fruit;
use Illuminate\Http\Request;
use App\Http\Requests\FruitRequest;
use App\Http\Resources\FruitResource;

class FruitController extends Controller
{
    public function index(Request $request)
    {
        $query = Fruit::query();

        if ($name = $request->name) {
            $query->where('name','like',"%$name%");
        }

        if ($request->size !== null) {
            $query->where('size', $request->size);   
        }

        $fruits = $query->orderBy('id', 'desc')->get();
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

    public function update(FruitRequest $request, Fruit $fruit)
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
