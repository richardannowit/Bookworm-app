import React, { Component } from 'react'
import BookCard from '../common/BookCard';

export default class FeaturedBooks extends Component {
    constructor(props) {
        super(props);
    }
    showBooks() {
        let books = this.props.books;
        if (books instanceof Array) {
            return books.map((book, i) => {
                return <div className="col-sm-3 pt-3" key={i}>
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
            });
        }
    }
    render() {
        const { title } = this.props;
        return (
            <div className="row d-flex align-items-center">
                <div className="col-lg-1">

                </div>
                <div className="container">
                    <div className="col-lg-12">
                        <div className="row row-cols-4">
                            {this.showBooks()}
                        </div>
                    </div>
                </div>
                <div className="col-lg-1">

                </div>


            </div >
        )
    }
}
