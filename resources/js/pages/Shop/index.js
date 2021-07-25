import React, { Component } from 'react'
import Filter from "./components/Filter";
import BookList from "./components/BookList";
import { BsXCircleFill } from "react-icons/bs";
import Loading from "../../components/Loading";
import './index.css';
import { setDefaultValue, htmlDecode, extractPageNumberFromURL } from '../../utils/StringUtils';
import queryString from 'query-string'
import {
    Link,
} from "react-router-dom";



class Shop extends Component {

    constructor(props) {
        super(props);
        this.state = { data: [], filter: 'none-1', filter_name: '', sort: 'on-sale', paginate: '15', isLoading: false };
        this.updateFilter = this.updateFilter.bind(this);
        this.updateSortType = this.updateSortType.bind(this);
        this.updatePaginate = this.updatePaginate.bind(this);
        this.getFilterName = this.getFilterName.bind(this);
    }


    async componentDidMount() {
        await this.updateState();
        await this.getBookData(1, this.state.filter, this.state.sort, this.state.paginate);

    }

    async updateState() {
        const values = queryString.parse(this.props.location.search);
        let filter_type = setDefaultValue(values.filter, 'none-1');
        let sort_type = setDefaultValue(values.sort, 'on-sale');
        let paginate_type = setDefaultValue(values.paginate, '15');
        this.setState({
            filter: filter_type,
            sort: sort_type,
            paginate: paginate_type
        });
    }


    async getBookData(pageNumber = 1, filter = 'none-1', sort = 'on-sale', paginate = '15') {
        this.setState({ isLoading: true }, () => {
            const url = `/api/shop/${filter}/${sort}/${paginate}?page=${pageNumber}`
            axios.get(url).then((response) => {
                this.setState({ data: response.data, isLoading: false }, () => { window.scrollTo(0, 0) });

            }).catch((error) => {
                if (error.response.status === 404) {
                    this.props.history.push('/404')
                }
                if (error.response.status === 500) {
                    this.props.history.push('/500')
                }
            })
        })


    }


    showPagination() {
        let links = this.state.data.links;
        if (links instanceof Array) {

            return links.map((link, i) => {
                return (
                    <li key={i} className={`page-item ${link.active ? "active" : ""} ${link.url === null ? "disabled" : ""}`}>
                        {link.url !== null ?
                            <Link className="page-link" to={link.url} onClick={() => this.getBookData(extractPageNumberFromURL(link.url), this.state.filter, this.state.sort, this.state.paginate)}>
                                {htmlDecode(link.label)}
                                {link.active ? <span className="sr-only">(current)</span> : <span></span>}
                            </Link>
                            :
                            <a className="page-link">{htmlDecode(link.label)}
                                {link.active ? <span className="sr-only">(current)</span> : <span></span>}
                            </a>
                        }
                    </li>
                );
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
            let filter_type = paramArray[0];
            let id = paramArray[1];
            if (filter_type === 'category') {
                categories.map((category, i) => {
                    if (category.id == id) {
                        result = 'Category ' + category.category_name.charAt(0).toUpperCase() + category.category_name.slice(1);
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
            } else if (filter_type === 'rating') {
                result = 'Rating ' + id + ' star';
                return;
            }
            return result;
        }
        this.setState({
            filter_name: getFilterNameByParam(this.state.filter)
        });
    }


    updateSortType(param) {
        this.setState({
            sort: param
        })
        this.getBookData(1, this.state.filter, param, this.state.paginate);
    }

    updatePaginate(value) {
        this.setState({
            paginate: value
        })
        console.log(this.state.filter);
        this.getBookData(1, this.state.filter, this.state.sort, value);
    }

    showLabelSortDropdown(sort) {
        const sortTypes = {
            'on-sale': 'Sort by on sale',
            'popular': 'Sort by popularity',
            'price-ascending': 'Sort by price: low to high',
            'price-descending': 'Sort by price: high to low',
        }
        return sortTypes[sort];
    }

    showSortDropdown() {
        let sortTypes = ['on-sale', 'popular', 'price-ascending', 'price-descending'];

        return sortTypes.map((sort, i) => {
            return (
                <Link
                    key={i}
                    className="dropdown-item"
                    onClick={() => this.updateSortType(sort)}
                    to={`/shop/?filter=${this.state.filter}&sort=${sort}&paginate=${this.state.paginate}`}
                >
                    {this.showLabelSortDropdown(sort)}
                </Link>
            );
        })
    }

    showLabelPaginateDropdown() {
        return 'Show ' + this.state.paginate;
    }


    showPaginateDropdown() {
        let paginationTypes = ['5', '15', '20', '25'];

        return paginationTypes.map((pagination, i) => {
            return (
                <Link
                    key={i}
                    className="dropdown-item"
                    onClick={() => this.updatePaginate(pagination)}
                    to={`/shop/?filter=${this.state.filter}&sort=${this.state.sort}&paginate=${pagination}`}
                >
                    Show {pagination}
                </Link>
            );
        })
    }

    clearFilter() {
        this.setState({
            filter: 'none-1',
            filter_name: '',
        }, () => {
            this.getBookData(1, this.state.filter, this.state.sort, this.state.paginate);
        });

    }

    render() {
        return (
            <div className="container-fluid">
                <div className="container-fluid pb-3" style={{ width: '90%' }}>
                    <div className="row pt-3">
                        <div className="d-inline mr-2">
                            <h5>Books</h5>
                        </div>
                        {(this.state.filter_name !== '') ?
                            <>
                                <div className="d-inline">
                                    <span>(Filtered by {this.state.filter_name})</span>

                                </div>
                                <div className="d-inline ml-2" >
                                    <Link to={`/shop/?filter=none-1&sort=${this.state.sort}&paginate=${this.state.paginate}`}>
                                        <BsXCircleFill onClick={() => this.clearFilter()} color="#F75454" />
                                    </Link>
                                </div>
                            </>
                            :
                            <div className="d-inline">
                            </div>
                        }
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
                                    {(this.state.data.total !== 0) ?
                                        <span className="mr-auto">{`Showing ${(this.state.data.current_page - 1) * this.state.data.per_page + 1}-${this.state.data.to} of ${this.state.data.total} books`}</span>
                                        :
                                        <span className="mr-auto">{`Showing 0 book`}</span>
                                    }

                                    <div className="dropdown mr-3">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {this.showLabelSortDropdown(this.state.sort)}
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            {this.showSortDropdown()}
                                        </div>
                                    </div>
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {this.showLabelPaginateDropdown()}
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            {this.showPaginateDropdown()}
                                        </div>
                                    </div>
                                </div>

                                {this.state.isLoading ?
                                    <Loading size="sm" />
                                    :
                                    <>
                                        <BookList books={this.state.data.data} />
                                        <div className="row justify-content-center pt-3">
                                            <nav aria-label="...">
                                                <ul className="pagination">
                                                    {this.showPagination()}
                                                </ul>
                                            </nav>
                                        </div>
                                    </>
                                }

                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

export default Shop;