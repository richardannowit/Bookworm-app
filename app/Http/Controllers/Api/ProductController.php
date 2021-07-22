<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    public function index($id = 0)
    {
        $query =  Book::find((int) $id);
        if (empty($query) || $id === null) {
            return response()->json(['error' => 'Book Not found'], 404);
        }
        return Book::where('id', $id)
            ->getAuthorName()
            ->getCategoryName()
            ->getAverageStar()
            ->getFinalPrice()
            ->getDateDiscount()
            ->getDiscountPrice()
            ->get();
        // ->toSql();
    }

    public function getReview($id = 0, $filter = '0', $sort = 'desc', $paginate = '15')
    {
        $query =  Book::find((int) $id);
        if (empty($query) || $id === null) {
            return response()->json(['error' => 'Book Not found'], 404);
        }

        // Check found book id

        $reviews =  Book::findOrFail((int) $id)
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

    public function postReview(Request $request, $id_book)
    {
        $validation = Validator::make($request->all(), [
            'review_title' => 'required|string|max:120',
            'review_details' => 'nullable|string',
            'rating_start' => ['required', Rule::in([1, 2, 3, 4, 5])]
        ]);

        if ($validation->fails()) {
            return response($validation->getMessageBag(), 400);
        }

        $review = Book::findOrFail($id_book)->reviews()->create($request->all());

        return response($review, 201);
    }


    public function countReview($id)
    {
        $query =  Book::find((int) $id);
        if (empty($query) || $id === null) {
            return response()->json(['error' => 'Book Not found'], 404);
        }

        // Check found book id

        $star = array();
        array_push($star, Book::findOrFail((int) $id)->reviews()->count());
        for ($i = 1; $i <= 5; $i++) {
            $cnt = Book::find((int) $id)->reviews();
            array_push($star, $cnt->where('rating_start', strval($i))->count());
        }
        return json_encode($star);
    }
}
