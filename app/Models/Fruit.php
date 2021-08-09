<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fruit extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'size',
        'color',
    ];

    public function getSizeTextAttribute()
    {
    	$size_text = '';

    	switch ($this->size) {
    		case 0:
    			$size_text = 'Pequeño';
    			break;
    		case 1:
    			$size_text = 'Mediano';
    			break;
    		case 2:
    			$size_text = 'Grande';
    			break;
    	}
    	return $size_text;
    }

}
