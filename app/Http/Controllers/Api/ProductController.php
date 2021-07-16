<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index($id)
    {
        return Book::where('id', $id)
            ->getAverageStar()
            ->getFinalPrice()
            ->getDateDiscount()
            ->getDiscountPrice()
            ->get();
        // ->toSql();
    }
}
