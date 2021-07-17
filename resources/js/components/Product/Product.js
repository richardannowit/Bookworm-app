import React, { Component } from 'react'
import {
    Link,
} from "react-router-dom";
import ReviewList from './ReviewList';
import BookDetails from './BookDetails';
import AddToCart from './AddToCart';
import WriteReview from './WriteReview';

export default class Product extends Component {
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
                                <BookDetails></BookDetails>
                            </div>
                            <div className="row border rounded shadow-sm mr-0 mt-5">
                                <ReviewList></ReviewList>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="row border rounded shadow-sm ml-0 mb-5 pb-4">
                                <AddToCart></AddToCart>
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
