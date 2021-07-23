import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

export default class WriteReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            details: "",
            star: 5
        };
    }

    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const review = {
            review_title: this.state.title,
            review_details: this.state.details,
            rating_start: this.state.star
        };
        let uri = "/api/product/" + this.props.book_id + "/reviews";
        axios.post(uri, review).then((response) => {
            console.log(response);
            toast.success('Your review has been successfully submitted', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            this.resetField();
            const { filter, sort, paginate, pageNumber } = this.props;
            this.props.loadReview(pageNumber, filter, sort, paginate);
        }).catch((error) => {

            if (error.response.status === 400) {
                toast.error(error.response.data.review_title[0], {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

            if (error.response.status === 404) {
                this.props.history.push('/404')
            }
            if (error.response.status === 500) {
                this.props.history.push('/500')
            }
        });
    };

    resetField() {
        this.setState({
            title: "",
            details: "",
            star: 5
        });
    }
    render() {
        return (
            <>
                <div className="row w-100 border-bottom ml-0 mt-0 mb-3">
                    <div className="row mx-5 my-2 w-100">
                        <h5 className="mr-2">Write a review</h5>
                    </div>
                </div>
                <form className="row w-100 border-bottom ml-0 mt-0 mb-3" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="row mx-5 w-100">
                        <div className="mb-2 w-100">
                            <label htmlFor="exampleInputEmail1">Add a title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                placeholder="Title"
                                value={this.state.title}
                                onChange={(e) => {
                                    this.isChange(e);
                                }}
                            />
                        </div>
                        <div className="mt-2 mb-2 w-100">
                            <label htmlFor="exampleInputPassword1">Details please! Your review helps other shoppers</label>
                            <textarea className="form-control" name="details" placeholder="Details"
                                value={this.state.details}
                                onChange={(e) => {
                                    this.isChange(e);
                                }}
                                rows="3"
                            >
                            </textarea>
                        </div>

                        <div className="mt-2 mb-2 w-100">
                            <label htmlFor="exampleFormControlSelect1">Select a rating star</label>
                            <select className="form-control" name="star"
                                value={this.state.star}
                                onChange={(e) => {
                                    this.isChange(e);
                                }}

                            >
                                <option value="1">1 Star</option>
                                <option value="2">2 Star</option>
                                <option value="3">3 Star</option>
                                <option value="4">4 Star</option>
                                <option value="5">5 Star</option>
                            </select>
                        </div>
                    </div>

                    <div className="row w-100 ml-0 border-top mb-0 mt-3 py-2">
                        <div className="row mx-5 w-100">
                            <div className="input-group my-2  justify-content-center ">
                                <button type="submit" className="btn btn-default btn-block border rounded-0 mb-2 bg-light"><strong>Submit review</strong></button>
                            </div>
                        </div>
                    </div>
                </form>
                <ToastContainer
                    position="bottom-right"
                    autoClose={10000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </>
        )
    }
}
