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
        $invalidQuantity = array();

        foreach ($books as $book) {
            if (!Book::where('id', '=', $book['book_id'])->exists()) {
                array_push($invalidBooks, $book['book_id']);
            }
            if (!($book['quantity'] >= 1 && $book['quantity'] <= 8)) {
                array_push($invalidQuantity, $book['book_id']);
            }
        }

        if (count($invalidBooks) !== 0) {
            return response()->json([
                'invalid_ids' => $invalidBooks,
                'error' => 'Some of the books in your cart are currently unavailable.!'
            ], 400);
        }

        if (count($invalidQuantity) !== 0) {
            return response()->json([
                'invalid_quantity' => $invalidQuantity,
                'error' => 'Book quantity is not valid!'
            ], 400);
        }

        $order = DB::transaction(function () use ($books) {
            $total = 0;
            foreach ($books as $book) {
                $book_price = Book::where('id', $book['book_id'])->getFinalPrice()->first();
                $book_price = $book_price['final_price'];
                $order_books[] = [
                    'book_id' => $book['book_id'],
                    'price' => $book_price,
                    'quantity' => $book['quantity']
                ];
                $total += ($book_price * $book['quantity']);
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
