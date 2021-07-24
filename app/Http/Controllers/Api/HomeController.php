<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;

class HomeController extends Controller
{
    public function index()
    {
        $onsale =  Book::sortByOnSale()
            ->limit(10)
            ->get();
        $recommended = Book::with('discount', 'reviews')
            ->has('reviews')
            ->getAverageStar()
            ->getFinalPrice()
            ->getDiscountPrice()
            ->orderByDesc('average_star')
            ->orderBy('final_price')
            ->limit(8)
            ->get();

        $popular = Book::sortByPopular()
            ->limit(8)
            ->get();

        return compact('onsale', 'recommended', 'popular', 200);
    }
}
