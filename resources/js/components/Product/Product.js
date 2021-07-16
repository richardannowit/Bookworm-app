import React, { Component } from 'react'

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
                                <div className="col-lg-3 pr-4">
                                    <div className="row">
                                        <img src="http://placehold.it/220x270">
                                        </img>
                                    </div>
                                    <div className="row mt-2">
                                        <small className="w-100 text-lg-right">
                                            By (author) <strong>Prof. Roselyn Weber DVM</strong>
                                        </small>
                                    </div>
                                </div>
                                <div className="col-lg-9 pl-4 pt-3 pr-5">
                                    <div className="row">
                                        <h4>Book title</h4>
                                    </div>
                                    <div className="row">
                                        <p className="pt-1">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, sapiente illo.
                                            Sit error voluptas repellat rerum quidem, soluta enim perferendis voluptates laboriosam.
                                            Distinctio, officia quis dolore quos sapiente tempore alias.
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, sapiente illo.
                                            Sit error voluptas repellat rerum quidem, soluta enim perferendis voluptates laboriosam.
                                            Distinctio, officia quis dolore quos sapiente tempore alias.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="row border rounded shadow-sm mr-0 mt-5" style={{ minHeight: '300px' }}>
                                Reviews
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="row border rounded shadow-sm ml-0 mb-5" style={{ minHeight: '300px' }}>
                                Add to cart
                            </div>
                            <div className="row border rounded shadow-sm ml-0 mt-5" style={{ minHeight: '300px' }}>
                                Write review
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
