<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FruitRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        switch($this->method())
        {
            case 'GET':
            case 'DELETE':
            {
                return [];
            }
            case 'POST':
            {
                return [
                    'name'=>'required|string',
                    'size'=>'required|integer|between:0,2',
                    'color'=>'required|string',
                ];
            }
            case 'PUT':
            case 'PATCH':
            {
                return [
                    'name'=>'min:1',
                    'size'=>'integer|between:0,2',
                ];
            }
            default:break;
        }
    }

    public function messages()
    {
        return [
            'name.required' => 'El nombre es requerido',
            'size.required' => 'El tamaño es requerido',
            'name.min' => 'El campo nombre no puede estar vacio',
            'size.integer' => 'Debe seleccionar un tamaño para continuar',
        ];
    }
}