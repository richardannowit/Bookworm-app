import React, { Component } from 'react'
import Filter from "./Filter";
import BookList from "./BookList";
import queryString from 'query-string'
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";



class Shop extends Component {

    constructor(props) {
        super(props);
        this.state = { data: [], filter: 'none-1', filter_name: '', sort: 'on-sale', paginate: '15' };
        this.updateFilter = this.updateFilter.bind(this);
        this.updateSortType = this.updateSortType.bind(this);
        this.updatePaginate = this.updatePaginate.bind(this);
        this.getFilterName = this.getFilterName.bind(this);
    }


    async componentDidMount() {
        await this.updateState();
        console.log(this.state.paginate);
        await this.getBookData(1, this.state.filter, this.state.sort, this.state.paginate);

    }

    async updateState() {
        const values = queryString.parse(this.props.location.search);
        let filter_type = values.filter === undefined ? 'none-1' : values.filter;
        let sort_type = values.sort === undefined ? 'on-sale' : values.sort;
        let paginate_type = values.paginate === undefined ? '15' : parseInt(values.paginate);
        this.setState({
            filter: filter_type,
            sort: sort_type,
            paginate: paginate_type
        });
    }


    async getBookData(pageNumber = 1, filter = 'none-1', sort = 'on-sale', paginate = '15') {
        const url = `/api/shop/${filter}/${sort}/${paginate}?page=${pageNumber}`
        const response = await axios.get(url);
        this.setState({ data: response.data });
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
                    {link.url !== null ? <Link className="page-link" to={link.url} onClick={() => this.getBookData(extractPageNumberFromURL(link.url), this.state.filter, this.state.sort, this.state.paginate)}>
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

    updateFilter(param, value) {
        this.setState({ filter: param, filter_name: value });
        this.getBookData(1, param, this.state.sort, this.state.paginate);

    }

    getFilterName(categories, authors) {

        function getFilterNameByParam(param) {
            let result = '';
            let paramArray = param.split('-');
            console.log(authors);
            let filter_type = paramArray[0];
            let id = paramArray[1];
            if (filter_type === 'category') {
                categories.map((category, i) => {
                    if (category.id == id) {
                        result = 'Category ' + category.category_name;
                        return;
                    }
                });
            } else if (filter_type === 'author') {
                authors.map((author, i) => {
                    if (author.id == id) {
                        result = 'Author  ' + author.author_name;
                        return;
                    }
                });
            } else {
                result = 'Rating ' + id + ' star';
            }
            return result;
        }
        console.log(getFilterNameByParam(this.state.filter));
        this.setState({
            filter_name: getFilterNameByParam(this.state.filter)
        });
    }


    updateSortType(param) {
        this.setState({
            sort: param
        })
        console.log(this.state.filter);
        this.getBookData(1, this.state.filter, param, this.state.paginate);
    }

    updatePaginate(value) {
        this.setState({
            paginate: value
        })
        console.log(this.state.filter);
        this.getBookData(1, this.state.filter, this.state.sort, value);
    }

    showLabelSortDropdown() {
        switch (this.state.sort) {
            case 'on-sale':
                return 'Sort by on sale';
            case 'popular':
                return 'Sort by popularity';
            case 'price-ascending':
                return 'Sort by price: low to high';
            case 'price-descending':
                return 'Sort by price: high to low';
        }
    }

    showLabelPaginateDropdown() {
        return 'Show ' + this.state.paginate;
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
                                <span>(Filtered by {this.state.filter_name})</span>
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
                                <Filter
                                    getFilter={this.updateFilter}
                                    currentSort={this.state.sort}
                                    currentFilter={this.state.filter}
                                    getFilterName={this.getFilterName}
                                    currentPaginate={this.state.paginate}
                                />
                            </aside>

                            <section className="col-lg-10" >
                                <div className="container">
                                    <div className="row d-flex">
                                        <span className="mr-auto">{`Showing ${(this.state.data.current_page - 1) * this.state.data.per_page + 1}-${this.state.data.to} of ${this.state.data.total} books`}</span>
                                        <div className="dropdown mr-3">
                                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {this.showLabelSortDropdown()}
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <Link className="dropdown-item" onClick={() => this.updateSortType('on-sale')} to={`/#/shop/?filter=${this.state.filter}&sort=on-sale&paginate=${this.state.paginate}`}>Sort by on sale</Link>
                                                <Link className="dropdown-item" onClick={() => this.updateSortType('popular')} to={`/#/shop/?filter=${this.state.filter}&sort=popular`}>Sort by popularity</Link>
                                                <Link className="dropdown-item" onClick={() => this.updateSortType('price-ascending')} to={`/#/shop/?filter=${this.state.filter}&sort=price-ascending&paginate=${this.state.paginate}`}>Sort by price: low to high</Link>
                                                <Link className="dropdown-item" onClick={() => this.updateSortType('price-descending')} to={`/#/shop/?filter=${this.state.filter}&sort=price-descending&paginate=${this.state.paginate}`}>Sort by price: high to low</Link>
                                            </div>
                                        </div>
                                        <div className="dropdown">
                                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {this.showLabelPaginateDropdown()}
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <Link className="dropdown-item" onClick={() => this.updatePaginate('5')} to={`/#/shop/?filter=${this.state.filter}&sort=${this.state.sort}&paginate=5`}>Show 5</Link>
                                                <Link className="dropdown-item" onClick={() => this.updatePaginate('15')} to={`/#/shop/?filter=${this.state.filter}&sort=${this.state.sort}&paginate=15`}>Show 15</Link>
                                                <Link className="dropdown-item" onClick={() => this.updatePaginate('20')} to={`/#/shop/?filter=${this.state.filter}&sort=${this.state.sort}&paginate=20`}>Show 20</Link>
                                                <Link className="dropdown-item" onClick={() => this.updatePaginate('25')} to={`/#/shop/?filter=${this.state.filter}&sort=${this.state.sort}&paginate=25`}>Show 25</Link>
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