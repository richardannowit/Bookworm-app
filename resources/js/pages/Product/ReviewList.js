import React, { Component } from 'react'
import {
    Link,
} from "react-router-dom";
import "./index.css"

export default class ReviewList extends Component {
    constructor(props) {
        super(props);
        this.state = { filter: '0', sort: 'desc', paginate: '15', pageNumber: '1' };
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

        let links = this.props.reviews.links;
        if (links instanceof Array) {

            return links.map((link, i) => {
                return <li key={i} className={`page-item ${link.active ? "active" : ""} ${link.url === null ? "disabled" : ""}`}>
                    {link.url !== null ? <a style={{ cursor: 'pointer' }} className="page-link" onClick={() => this.handleChange(this.state.filter, this.state.sort, this.state.paginate, extractPageNumberFromURL(link.url))}>
                        {htmlDecode(link.label)}
                        {link.active ? <span className="sr-only">(current)</span> : <span></span>}
                    </a>
                        :
                        <a className="page-link">{htmlDecode(link.label)}
                            {link.active ? <span className="sr-only">(current)</span> : <span></span>}
                        </a>
                    }
                </li>
            })
        }
    }

    handleChange(filter, sort, paginate, pageNumber) {
        this.setState({
            filter: filter,
            sort: sort,
            paginate: paginate,
            pageNumber: pageNumber
        }, () => {
            this.props.changeReviewList(this.state.filter, this.state.sort, this.state.paginate, this.state.pageNumber);
        });


    }


    showReviews() {

        function spiltDate(dateTime) {
            var nowDate = new Date(dateTime);
            return nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
        }
        function convertDate(date) {
            var s = date.split(/\D/), dt = new Date(s[0], s[1] - 1, s[2]);
            return dt.toLocaleString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' });
        }

        const reviews = this.props.reviews.data;
        if (reviews instanceof Array) {
            if (reviews.length === 0) {
                return (<span>There are no review</span>)
            }

            return reviews.map((review, i) => {
                return (
                    <div className="col-lg-12 mx-2 mt-2 pb-4 border-bottom" key={i} id="review-item">
                        <div className="row align-items-center my-2">
                            <h5 className="d-inline mr-2 mb-1">{review.review_title}</h5>
                            <span className="d-inline">| {review.rating_start} stars</span>
                        </div>
                        <div className="row my-1">
                            <p>
                                {review.review_details}
                            </p>
                        </div>
                        <div className="row my-1">
                            <span>{convertDate(spiltDate(review.review_date.toString()))}</span>
                        </div>
                    </div>
                );
            });
        }
    }


    getSortLabel(key) {
        const data = {
            'desc': 'Sort by date: newest to oldest',
            'asc': 'Sort by date: oldest to newest',
        }
        return data[key];
    }

    getPaginateLabel(key) {
        return 'Show ' + key;
    }



    render() {
        return (
            <>
                <div className="row mx-4 my-4 w-100" id="header-review">
                    <div className="col-lg-12 mx-2 my-2">
                        <div className="row align-items-center">
                            <h5 className="d-inline mr-2 mb-1">Customer Reviews</h5>
                            <span className="d-inline">{this.state.filter !== '0' && `(Filtered by ${this.state.filter} star)`}</span>
                        </div>
                        <div className="row my-2">
                            <h4 className="d-block">{parseFloat(this.props.AR).toFixed(1)} Star {this.props.count_reviews}</h4>
                        </div>

                        <div className="row">
                            <small onClick={() => this.handleChange('0', this.state.sort, this.state.paginate, this.state.pageNumber)} className="filter mr-3">Total ({this.props.countReview[0]})</small>
                            <small onClick={() => this.handleChange('5', this.state.sort, this.state.paginate, this.state.pageNumber)} className="filter mr-3">5 star ({this.props.countReview[5]})</small>
                            <small onClick={() => this.handleChange('4', this.state.sort, this.state.paginate, this.state.pageNumber)} className="filter mr-3">4 star ({this.props.countReview[4]})</small>
                            <small onClick={() => this.handleChange('3', this.state.sort, this.state.paginate, this.state.pageNumber)} className="filter mr-3">3 star ({this.props.countReview[3]})</small>
                            <small onClick={() => this.handleChange('2', this.state.sort, this.state.paginate, this.state.pageNumber)} className="filter mr-3">2 star ({this.props.countReview[2]})</small>
                            <small onClick={() => this.handleChange('1', this.state.sort, this.state.paginate, this.state.pageNumber)} className="filter mr-3">1 star ({this.props.countReview[1]})</small>
                        </div>
                        <div className="row d-flex my-3 mr-3">
                            {(this.props.reviews.total !== 0) ?
                                <span className="mr-auto">{`Showing ${(this.props.reviews.current_page - 1) * this.props.reviews.per_page + 1}-${this.props.reviews.to} of ${this.props.reviews.total} reviews`}</span>
                                :
                                <span className="mr-auto">{`Showing 0 reviews`}</span>
                            }
                            <div className="dropdown mr-3">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {this.getSortLabel(this.state.sort)}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a onClick={() => this.handleChange(this.state.filter, 'desc', this.state.paginate, this.state.pageNumber)} className="dropdown-item">Sort by date: newest to oldest</a>
                                    <a onClick={() => this.handleChange(this.state.filter, 'asc', this.state.paginate, this.state.pageNumber)} className="dropdown-item">Sort by date: oldest to newest</a>
                                </div>
                            </div>
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {this.getPaginateLabel(this.state.paginate)}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a onClick={() => this.handleChange(this.state.filter, this.state.sort, '5', this.state.pageNumber)} className="dropdown-item">Show 5</a>
                                    <a onClick={() => this.handleChange(this.state.filter, this.state.sort, '15', this.state.pageNumber)} className="dropdown-item">Show 15</a>
                                    <a onClick={() => this.handleChange(this.state.filter, this.state.sort, '20', this.state.pageNumber)} className="dropdown-item">Show 20</a>
                                    <a onClick={() => this.handleChange(this.state.filter, this.state.sort, '25', this.state.pageNumber)} className="dropdown-item">Show 25</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mx-4 w-100" id="review-list">
                    {this.showReviews()}

                </div>
                <div className="row justify-content-center w-100 pt-3">
                    <nav aria-label="...">
                        <ul className="pagination">
                            {this.showPagination()}
                        </ul>
                    </nav>
                </div>
            </>
        )
    }
}
