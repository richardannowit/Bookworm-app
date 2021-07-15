import React, { Component } from 'react'
import Filter from "./Filter";
import BookList from "./BookList";
import queryString from 'query-string'
import {
    BrowserRouter as Router,
    Link,
    useLocation,
    useParams,
    useRef
} from "react-router-dom";



class Shop extends Component {

    constructor(props) {
        super(props);
        this.state = { data: [], filter: 'none-1', sort: 'on-sale' };
        this.updateFilter = this.updateFilter.bind(this);
        this.updateSortType = this.updateSortType.bind(this);
    }


    async componentDidMount() {
        await this.getBookData(1, this.state.filter, this.state.sort);

    }


    async getBookData(pageNumber = 1, filter = 'none-1', sort = 'on-sale') {
        const url = `/api/shop/${filter}/${sort}?page=${pageNumber}`
        const response = await axios.get(url);
        this.setState({ data: response.data });
        console.log(this.state.filter, this.state.sort);
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

    updateFilter(param) {
        this.setState({ filter: param });
        this.getBookData(1, param, this.state.sort);

    }

    updateSortType(param) {
        this.setState({
            sort: param
        })
        console.log(this.state.filter);
        this.getBookData(1, this.state.filter, param);
    }

    render() {
        return (
            <Router>
                <div className="container-fluid">
                    <div className="container-fluid pb-3" style={{ width: '90%' }}>
                        <div className="row pt-3">
                            <div className="d-inline mr-2">
                                <h5>Books</h5>
                            </div>
                            <div className="d-inline">
                                <span>(Filtered by Category #1)</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <hr />
                            </div>
                        </div>
                    </div>


                    <div className="container-fluid pb-5 mb-2" style={{ width: '90%' }}>
                        <div className="row">
                            <aside className="col-lg-2">
                                <Filter getFilter={this.updateFilter} currentSort={this.state.sort} />
                            </aside>

                            <section className="col-lg-10" >
                                <div className="container">
                                    <div className="row d-flex">
                                        <span className="mr-auto">Showing 1-12 of 126 books</span>
                                        <div className="dropdown mr-3">
                                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Sort by on sale
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <Link className="dropdown-item" onClick={() => this.updateSortType('on-sale')} to={`/#/shop/?filter=${this.state.filter}&sort=on-sale`}>Sort by on sale</Link>
                                                <Link className="dropdown-item" onClick={() => this.updateSortType('popular')} to={`/#/shop/?filter=${this.state.filter}&sort=popular`}>Sort by popularity</Link>
                                                <Link className="dropdown-item" onClick={() => this.updateSortType('price-ascending')} to={`/#/shop/?filter=${this.state.filter}&sort=price-ascending`}>Sort by price: low to high</Link>
                                                <Link className="dropdown-item" onClick={() => this.updateSortType('price-descending')} to={`/#/shop/?filter=${this.state.filter}&sort=price-descending`}>Sort by price: high to low</Link>
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
                                    <BookList books={this.state.data.data} />

                                    <div className="row justify-content-center pt-3">
                                        <nav aria-label="...">
                                            <ul className="pagination">
                                                {this.showPagination()}
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </Router >
        );
    }
}

export default Shop;