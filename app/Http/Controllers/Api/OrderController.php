<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $books = $request->data;

        $invalidBooks = array();
        foreach ($books as $book) {
            if (!Book::where('id', '=', $book['book_id'])->exists()) {
                array_push($invalidBooks, $book['book_id']);
            }
        }

        if (count($invalidBooks) !== 0) {
            return response()->json([
                'invalid_ids' => $invalidBooks
            ], 400);
        }


        $order = DB::transaction(function () use ($books) {
            $total = 0;
            foreach ($books as $book) {
                $order_books[] = [
                    'book_id' => $book['book_id'],
                    'price' => $book['price'],
                    'quantity' => $book['quantity']
                ];
                $total += ($book['price'] * $book['quantity']);
            }
            $order = Order::create([
                'order_date' => now(),
                'order_amount' => $total
            ]);
            $order->order_items()->createMany($order_books);

            return $order;
        });
        return response($order, 201);
    }
}
