<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ShopController extends Controller
{
    public function index($filter = 'none-5', $sort = 'onsale', $paginate = '15')
    {
        // return Book::getFinalPrice()
        //     ->getDateDiscount()
        //     ->getDiscountPrice()
        //     // ->get();
        //     ->toSql();

        return Book::filterBy($filter)
            ->sortBy($sort)
            ->paginate((int) $paginate)
            ->appends(['filter' => $filter, 'sort' => $sort, 'paginate' => $paginate])
            ->withPath('/#/shop/');
    }

    public function getFilter()
    {
        $categories = Category::all();
        $authors = Author::all();
        return compact('categories', 'authors');
    }
}
