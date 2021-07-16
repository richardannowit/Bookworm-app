<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;

class HomeController extends Controller
{
    public function getOnSaleBooks()
    {
        return Book::sortByOnSale()
            ->limit(10)
            ->get();
        // ->toSql();
    }

    public function getRecommendedBooks()
    {
        return Book::has('reviews')
            ->getAverageStar()
            ->getFinalPrice()
            ->getDiscountPrice()
            ->orderByDesc('AR')
            ->orderBy('final_price')
            ->limit(8)
            ->get();
    }

    public function getPopularBooks()
    {
        return Book::sortByPopular()
            ->limit(8)
            ->get();
    }
}
