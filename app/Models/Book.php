<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Review;
use App\Models\Discount;
use App\Models\Category;
use App\Models\Author;

class Book extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function discount()
    {
        return $this->hasOne(Discount::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function author()
    {
        return $this->belongsTo(Author::class);
    }


    public function scopeGetSubPrice($query)
    {
        return $query->addSelect([
            'sub_price' => Discount::select(\DB::raw('books.book_price - discounts.discount_price'))
                ->whereColumn('book_id', 'books.id')
        ]);
    }


    public function scopeGetAverageStar($query)
    {
        return $query->has('reviews')
            ->addSelect([
                'AR' => Review::select(\DB::raw('SUM(cast(reviews.rating_start AS DOUBLE PRECISION))/COUNT(reviews.id)'))
                    ->whereColumn('book_id', 'books.id')
            ]);
    }

    public function scopeGetDiscountPrice($query)
    {
        return $query->addSelect([
            'discount_price' => Discount::select('discount_price')
                // ->discountAvailable()
                ->whereColumn('book_id', 'books.id')
                ->where(function ($query) {
                    $query->where('discount_start_date', '<=', now())
                        ->where(function ($query) {
                            $query->whereDate('discount_end_date', '>=', now())
                                ->orWhereNull('discount_end_date');
                        });
                })
        ]);
    }

    public function scopeGetDateDiscount($query)
    {
        return $query->addSelect([
            'start' => Discount::select('discount_start_date')->whereColumn('book_id', 'books.id'),
            'end' => Discount::select('discount_end_date')->whereColumn('book_id', 'books.id')
        ]);
    }


    public function scopeGetFinalPrice($query)
    {
        return $query->addSelect([
            'final_price' => Discount::select(\DB::raw('coalesce(max(discounts.discount_price), books.book_price)'))
                ->whereColumn('book_id', 'books.id')
                ->where(function ($query) {
                    $query->where('discount_start_date', '<=', now())
                        ->where(function ($query) {
                            $query->whereDate('discount_end_date', '>=', now())
                                ->orWhereNull('discount_end_date');
                        });
                })
        ]);
    }

    public function scopeSortByOnSale($query)
    {
        return $query->has('discount')
            ->getFinalPrice()
            ->getSubPrice()
            ->getDiscountPrice()
            // ->orderByDesc('sub_price');
            ->orderByRaw('sub_price DESC NULLS LAST');
    }

    public function scopeSortByPopular($query)
    {
        return $query->withCount('reviews')
            ->getFinalPrice()
            ->getDiscountPrice()
            ->orderByDesc('reviews_count')
            ->orderBy('final_price');
    }

    public function scopeSortBy($query, $sort)
    {
        switch ($sort) {
            case "popular":
                return $query->sortByPopular();
                break;
            case "price-ascending":
                return $query->getFinalPrice()->getDiscountPrice()->orderBy('final_price');
                break;
            case "price-descending":
                return $query->getFinalPrice()->getDiscountPrice()->orderByDesc('final_price');
                break;
            default:
                return $query->sortByOnSale()->orderBy('final_price');
        }
    }

    public function scopeFilterBy($query, $filter)
    {

        $filterArray = explode('-', $filter);
        $type = "none";
        $value = 1;
        if (count($filterArray) == 2) {
            $type = $filterArray[0];
            $value = (int) $filterArray[1];
        }


        switch ($type) {
            case "category":
                return $query->whereHas('category', function ($query) use ($value) {
                    $query->where('id', '=', $value);
                });
                break;
            case "author":
                return $query->whereHas('author', function ($query) use ($value) {
                    $query->where('id', '=', $value);
                });
                break;
            case "rating":

                $query = $query->getAverageStar();
                return $query->where(
                    \DB::raw('(select SUM(cast(reviews.rating_start AS DOUBLE PRECISION))/COUNT(reviews.id) from "reviews" where "book_id" = "books"."id")'),
                    '>=',
                    $value
                );
                break;
            default:
                return $query;
        }
    }
}
