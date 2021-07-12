import React, { useState, useEffect } from 'react';
import BookCard from '../common/BookCard';
import {
    Link,
    useLocation
} from "react-router-dom";

function BookList(props) {


    const [state, setState] = useState({
        data: []
    });

    useEffect(() => {
        let { filter, sort, page } = props;
        filter = (filter === null || filter === "".trim()) ? "none-1" : filter;
        sort = (sort === null || sort === "".trim()) ? "onsale" : sort;
        page = (page === null || page === "".trim()) ? "1" : page;


        axios.get("/api/shop/" + filter + "/" + sort + "?page=" + page).then((response) => {
            setState({ data: response.data });
        }).catch(function (error) {
            console.log(error);
        });
    }, []);


    const showBooks = () => {
        let books = state.data.data;
        if (books instanceof Array) {
            return books.map((book, i) => {
                return <div className="col my-3" style={{ marginRight: "0px" }} key={i}>
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

    const showPagination = () => {
        function htmlDecode(input) {
            var doc = new DOMParser().parseFromString(input, "text/html");
            return doc.documentElement.textContent;
        }
        let links = state.data.links;
        if (links instanceof Array) {

            return links.map((link, i) => {
                return <li key={i} className={`page-item ${link.active ? "active" : ""} ${link.url === null ? "disabled" : ""}`}>
                    {link.url !== null ? <Link className="page-link" to={link.url}>{htmlDecode(link.label)}
                        {link.active ? <span className="sr-only">(current)</span> : <span></span>}
                    </Link>
                        :
                        <a className="page-link">{htmlDecode(link.label)}
                            {link.active ? <span className="sr-only">(current)</span> : <span></span>}
                        </a>
                    }
                </li>
            })
        }
    }

    return (
        <div className="container">
            <div className="row d-flex">
                <span className="mr-auto">Showing 1-12 of 126 books</span>
                <div className="dropdown mr-3">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Sort by on sale
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Sort by on sale</a>
                        <a className="dropdown-item" href="#">Sort by popularity</a>
                        <a className="dropdown-item" href="#">Sort by price: low to high</a>
                        <a className="dropdown-item" href="#">Sort by price: high to low</a>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Show 15
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Show 5</a>
                        <a className="dropdown-item" href="#">Show 15</a>
                        <a className="dropdown-item" href="#">Show 20</a>
                        <a className="dropdown-item" href="#">Show 25</a>
                    </div>
                </div>
            </div>

            <div className="row row-cols-5 justify-content-center  pb-3">
                {showBooks()}
            </div>

            <div className="row justify-content-center pt-3">
                <nav aria-label="...">
                    <ul className="pagination">
                        {showPagination()}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default BookList;