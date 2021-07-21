import React, { Component } from 'react'
import {
    Link,
} from "react-router-dom";

export default class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = { categories: [], authors: [] };
    }

    async componentDidMount() {
        await this.getDataForFilter();
        this.props.getFilterName(this.state.categories, this.state.authors);
    }

    async getDataForFilter() {
        const url = '/api/filter';
        const response = await axios.get(url);
        this.setState({ categories: response.data.categories, authors: response.data.authors });
    }

    getFilterNameByParam(param) {
        let result = '';
        let paramArray = param.split('-');
        let filter_type = paramArray[0];
        let id = paramArray[1];
        if (filter_type === 'category') {
            this.state.categories.map((category, i) => {
                if (category.id == id) {
                    result = 'Category ' + category.category_name.charAt(0).toUpperCase() + category.category_name.slice(1);
                    return;
                }
            });
        } else if (filter_type === 'author') {
            this.state.authors.map((author, i) => {
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

    showCategories() {
        let categories = this.state.categories;
        if (categories.length == 0) {
            return <li>There no category</li>
        }

        if (categories instanceof Array) {
            return categories.map((category, i) => {
                //href={`/#/shop/category-${category.id}`}
                return <li key={i}>
                    <Link
                        to={`/shop/?filter=category-${category.id}&sort=${this.props.currentSort}&paginate=${this.props.currentPaginate}`}
                        onClick={() => this.updateParams('category-' + category.id, this.getFilterNameByParam('category-' + category.id))}>
                        {category.category_name.charAt(0).toUpperCase() + category.category_name.slice(1)}
                    </Link></li>
            });
        }
    }

    showAuthors() {
        let authors = this.state.authors;
        if (authors.length == 0) {
            return <li>There no author</li>
        }

        if (authors instanceof Array) {
            return authors.map((author, i) => {
                //href={`/#/shop/author-${author.id}`}
                return <li key={i}>
                    <Link
                        to={`/shop/?filter=author-${author.id}&sort=${this.props.currentSort}&paginate=${this.props.currentPaginate}`}
                        onClick={() => this.updateParams('author-' + author.id, this.getFilterNameByParam('author-' + author.id))}>
                        {author.author_name}
                    </Link></li>
            });
        }
    }

    updateParams(param, value) {
        this.props.getFilter(param, value);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h6>Filter by</h6>
                </div>
                <div className="row">
                    <div className="custom-accordion w-100 rounded-2 shadow-lg" id="accordion_1">
                        <div className="accordion-item active">
                            <h2 className="mb-0">
                                <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    <span className="wrap-icon mr-3">
                                        <span className="icon-person_outline" />
                                    </span>
                                    Category
                                </button>
                            </h2>
                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion_1" style={{}}>
                                <div className="accordion-body">
                                    <ul className="custom-menu">

                                        {this.showCategories()}

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item active">
                            <h2 className="mb-0">
                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    <span className="wrap-icon mr-3">
                                        <span className="icon-mail_outline" />
                                    </span>
                                    Author
                                </button>
                            </h2>
                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion_1" style={{}}>
                                <div className="accordion-body">
                                    <ul className="custom-menu">
                                        {this.showAuthors()}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="mb-0">
                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    <span className="wrap-icon mr-3">
                                        <span className="icon-gear" />
                                    </span>
                                    Rating Review
                                </button>
                            </h2>
                            <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion_1">
                                <div className="accordion-body">
                                    <ul className="custom-menu">
                                        <li>
                                            <Link to={`/shop/?filter=rating-1&sort=${this.props.currentSort}`} onClick={() => this.updateParams('rating-1', this.getFilterNameByParam('rating-1'))}>
                                                1 Star
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={`/shop/?filter=rating-2&sort=${this.props.currentSort}`} onClick={() => this.updateParams('rating-2', this.getFilterNameByParam('rating-2'))}>
                                                2 Star
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={`/shop/?filter=rating-3&sort=${this.props.currentSort}`} onClick={() => this.updateParams('rating-3', this.getFilterNameByParam('rating-3'))}>
                                                3 Star
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={`/shop/?filter=rating-4&sort=${this.props.currentSort}`} onClick={() => this.updateParams('rating-4', this.getFilterNameByParam('rating-4'))}>
                                                4 Star
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={`/shop/?filter=rating-5&sort=${this.props.currentSort}`} onClick={() => this.updateParams('rating-5', this.getFilterNameByParam('rating-5'))}>
                                                5 Star
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
