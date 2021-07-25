import React, { Component } from 'react';
import BookCard from '../../../components/BookCard';

class BookList extends Component {

    constructor(props) {
        super(props);
    }

    showBooks() {
        let books = this.props.books;
        if (books instanceof Array) {
            return books.map((book, i) => {
                return (
                    <div className="col my-3" style={{ marginRight: "0px" }} key={i}>
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
            });
        }
    }


    render() {
        return (
            <div className="row row-cols-5 justify-content-center  pb-3">
                {this.showBooks()}
            </div>
        )
    }
}

export default BookList;