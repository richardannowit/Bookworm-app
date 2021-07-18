import React, { Component } from 'react'
import {
    Link,
} from "react-router-dom";
import ReviewList from './ReviewList';
import BookDetails from './BookDetails';
import AddToCart from './AddToCart';
import WriteReview from './WriteReview';

export default class Product extends Component {

    constructor(props) {
        super(props);
        this.state = { bookDetails: [], reviews: [] };
        this.getReviews = this.getReviews.bind(this);
        this.handleChangeReviewList = this.handleChangeReviewList.bind(this);
    }


    async componentDidMount() {
        await this.getBookDetails();
        await this.getReviews();

    }

    async getBookDetails() {
        const bookId = this.props.match.params.id;
        const url = `/api/product/${bookId}`
        const response = await axios.get(url);
        this.setState({ bookDetails: response.data[0] });
    }

    async getReviews(pageNumber = 1, filter = '0', sort = 'desc', paginate = '15') {
        const bookId = this.props.match.params.id;
        const url = `/api/product/${bookId}/reviews/${filter}/${sort}/${paginate}?page=${pageNumber}`
        const response = await axios.get(url);
        this.setState({ reviews: response.data });
    }


    async handleChangeReviewList(filter, sort, paginate, pageNumber) {
        await this.getReviews(pageNumber, filter, sort, paginate);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="container-fluid pb-3" style={{ width: '90%' }}>
                    <div className="row pt-3">
                        <div className="mr-2">
                            <h5>Category Name</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <hr />
                        </div>
                    </div>


                </div>

                <div className="container-fluid pb-3" style={{ width: '90%' }}>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row border rounded shadow-sm pb-3 mr-0 mb-5">
                                <BookDetails details={this.state.bookDetails}></BookDetails>
                            </div>
                            <div className="row border rounded shadow-sm mr-0 mt-5">
                                <ReviewList
                                    AR={this.state.bookDetails.AR}
                                    reviews={this.state.reviews}
                                    changeReviewList={this.handleChangeReviewList}
                                ></ReviewList>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="row border rounded shadow-sm ml-0 mb-5 pb-4">
                                <AddToCart discount_price={this.state.bookDetails.discount_price} book_price={this.state.bookDetails.book_price}></AddToCart>
                            </div>
                            <div className="row border rounded shadow-sm ml-0 mt-5" style={{ minHeight: '300px' }}>
                                <WriteReview></WriteReview>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
