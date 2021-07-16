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

    public function getReview($id, $filter = '0', $sort = 'desc', $paginate = '15')
    {
        $reviews =  Book::find((int) $id)
            ->reviews();
        if ($filter !== '0') {
            $reviews->where('rating_start', $filter);
        }


        if ($sort === 'asc') {
            $reviews->orderBy('review_date');
        } else {
            $reviews->orderByDesc('review_date');
        }

        return $reviews->paginate((int) $paginate)
            ->appends(['filter' => $filter, 'sort' => $sort, 'paginate' => $paginate])
            ->withPath('/#/product/' . $id . '/reviews/');
    }
}
