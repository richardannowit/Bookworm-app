<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Book;

class Review extends Model
{
    use HasFactory;

    const CREATED_AT = "review_date";
    const UPDATED_AT = "review_date";

    protected $fillable = ['book_id', 'review_title', 'review_details', 'rating_start'];

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
