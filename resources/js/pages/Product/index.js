import React, { Component } from 'react'
import ReviewList from './components/ReviewList';
import BookDetails from './components/BookDetails';
import AddToCart from './components/AddToCart';
import WriteReview from './components/WriteReview';

export default class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookDetails: {},
            reviews: [],
            count_reviews: [],
            filter: '0',
            sort: 'desc',
            paginate: '15',
            pageNumber: 1
        };
        this.getReviews = this.getReviews.bind(this);
        this.reloadReview = this.reloadReview.bind(this);
        this.handleChangeReviewList = this.handleChangeReviewList.bind(this);
        this.getNumberReviewEachStar = this.getNumberReviewEachStar.bind(this);
    }


    async componentDidMount() {
        window.scrollTo(0, 0)
        await this.getReviews();
        await this.getNumberReviewEachStar();
        let cartFromStorage = JSON.parse(localStorage.getItem('cart')) || [];
        localStorage.setItem('cart', JSON.stringify(cartFromStorage));
    }

    async getBookDetails() {
        const bookId = this.props.match.params.id;
        const url = `/api/product/${bookId}`
        axios.get(url).then((response) => {
            this.setState({ bookDetails: response.data });
        }).catch((error) => {
            if (error.response.status === 404) {
                this.props.history.push('/404')
            }
            if (error.response.status === 500) {
                this.props.history.push('/500')
            }
        })

    }

    async getReviews(pageNumber = 1, filter = '0', sort = 'desc', paginate = '15') {
        const bookId = this.props.match.params.id;
        const url = `/api/product/${bookId}/reviews/${filter}/${sort}/${paginate}?page=${pageNumber}`
        const response = await axios.get(url);
        this.setState({ reviews: response.data });
        await this.getBookDetails();
    }

    async getNumberReviewEachStar() {
        const bookId = this.props.match.params.id;
        const url = `/api/product/${bookId}/count-reviews`;
        const response = await axios.get(url);
        this.setState({
            count_reviews: response.data
        });
    }


    async reloadReview(pageNumber, filter, sort, paginate) {
        await this.getReviews(pageNumber, filter, sort, paginate);
        await this.getNumberReviewEachStar();
    }


    async handleChangeReviewList(filter, sort, paginate, pageNumber) {
        this.setState({
            filter: filter,
            sort: sort,
            paginate: paginate,
            pageNumber: pageNumber,
        });

        await this.getReviews(pageNumber, filter, sort, paginate);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="container-fluid pb-3" style={{ width: '90%' }}>
                    <div className="row pt-3">
                        <div className="mr-2">
                            <h5>{'Category ' + this.state.bookDetails.category_name}</h5>
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
                                    average_star={this.state.bookDetails.average_star}
                                    reviews={this.state.reviews}
                                    changeReviewList={this.handleChangeReviewList}
                                    countReview={this.state.count_reviews}
                                ></ReviewList>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="row border rounded shadow-sm ml-0 mb-5 pb-4">
                                <AddToCart
                                    bookDetails={this.state.bookDetails}
                                />
                            </div>
                            <div className="row border rounded shadow-sm ml-0 mt-5">
                                <WriteReview
                                    book_id={this.state.bookDetails.id}
                                    filter={this.state.filter}
                                    sort={this.state.sort}
                                    paginate={this.state.paginate}
                                    pageNumber={this.state.pageNumber}
                                    loadReview={this.reloadReview}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
