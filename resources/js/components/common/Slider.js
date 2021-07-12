import React, { Component } from 'react'
import BookCard from "./BookCard";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

export default class Slider extends Component {
    constructor(props) {
        super(props);

    }


    showBooks() {
        const chunk = (array, size) => {
            const chunkedArray = []
            for (var i = 0; i < array.length; i += size) {
                chunkedArray.push(array.slice(i, i + size))
            }
            return chunkedArray
        }


        let books = this.props.books;
        books = chunk(books, 4);

        if (books instanceof Array) {
            return books.map(function (chunkBook, chunkIndex) {
                return (
                    <div className={"carousel-item " + ((chunkIndex == 0) ? "active" : "")} key={chunkIndex}>
                        <div className="row" >
                            {chunkBook.map(function (book, i) {
                                //console.log(product);
                                return (

                                    <div className="col-lg-3" key={i}>
                                        <BookCard
                                            key={i}
                                            title={book.book_title}
                                            id={book.id}
                                            author={book.author_name}
                                            cover={book.book_cover_photo}
                                            price={book.book_price}
                                            discount_price={book.discount_price}

                                        ></BookCard>
                                    </div>

                                );
                            })}
                        </div>
                    </div>
                );
            });
        }
    }

    render() {
        return (
            <div id="book-slide" className="row d-flex align-items-center carousel slide" data-ride="carousel">
                <div className="col-lg-1">
                    <a href="#book-slide" data-slide="prev">
                        <BsChevronLeft size="2em"></BsChevronLeft>
                    </a>
                </div>
                <div className="container">
                    <div className="col-lg-12">
                        <div className="carousel-inner" style={{ padding: "25px 0px" }}>
                            {this.showBooks()}


                        </div>
                    </div>
                </div>
                <div className="col-lg-1">
                    <a href="#book-slide" data-slide="next">
                        <BsChevronRight size="2em"></BsChevronRight>
                    </a>
                </div>
            </div>
        )
    }
}
