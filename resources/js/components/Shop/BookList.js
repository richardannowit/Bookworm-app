import React, { Component } from 'react';
import BookCard from '../common/BookCard';
import Pagination from "react-js-pagination";
import {
    Link,
    useLocation
} from "react-router-dom";

class BookList extends Component {

    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    async componentDidMount() {
        await this.getBookData();
    }

    async getBookData(pageNumber = 1) {
        let { filter, sort } = this.props;
        filter = (filter === null || filter === "".trim()) ? "none-1" : filter;
        sort = (sort === null || sort === "".trim()) ? "onsale" : sort;
        const url = `/api/shop/${filter}/${sort}?page=${pageNumber}`
        const response = await axios.get(url);
        this.setState({ data: response.data });
    }


    showBooks() {
        let books = this.state.data.data;
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

    showPagination() {
        function htmlDecode(input) {
            var doc = new DOMParser().parseFromString(input, "text/html");
            return doc.documentElement.textContent;
        }
        function extractPageNumberFromURL(url) {
            let urlArray = url.split("&");
            let pageParam = urlArray[urlArray.length - 1];
            let pageNumber = pageParam.split("=");
            return pageNumber[pageNumber.length - 1];
        }


        const { current_page, per_page, total } = this.state.data;
        let links = this.state.data.links;
        if (links instanceof Array) {

            return links.map((link, i) => {
                return <li key={i} className={`page-item ${link.active ? "active" : ""} ${link.url === null ? "disabled" : ""}`}>
                    {link.url !== null ? <Link className="page-link" to={link.url} onClick={() => this.getBookData(extractPageNumberFromURL(link.url))}>
                        {htmlDecode(link.label)}
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


    // showPagination() {
    //     const { current_page, per_page, total } = this.state.data;
    //     return (<Pagination
    //         activePage={current_page}
    //         totalItemsCount={total}
    //         itemsCountPerPage={per_page}
    //         onChange={(pageNumber) => this.getBookData(pageNumber)}
    //         itemClass="page-link"
    //         firstPageText="First"
    //         lastPageText="Last"

    //     />
    //     )
    // }
    render() {
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
                    {this.showBooks()}
                </div>

                <div className="row justify-content-center pt-3">
                    <nav aria-label="...">
                        <ul className="pagination">
                            {this.showPagination()}
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}

export default BookList;