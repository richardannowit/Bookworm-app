<?php

use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\ShopController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/home/onsale', [HomeController::class, 'getOnSaleBooks'])->name('home.onsale');
Route::get('/home/recommended', [HomeController::class, 'getRecommendedBooks'])->name('home.recommended');
Route::get('/home/popular', [HomeController::class, 'getPopularBooks'])->name('home.popular');


Route::get('/shop/{filter?}/{sort?}', [ShopController::class, 'index'])->name('shop.index');
Route::get('/filter', [ShopController::class, 'getFilter'])->name('shop.filter');
