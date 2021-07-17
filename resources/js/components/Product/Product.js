import React, { Component } from 'react'
import {
    Link,
} from "react-router-dom";

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
                            <div className="row border rounded shadow-sm mr-0 mt-5">
                                <div className="row mx-4 my-4 w-100" id="header-review">
                                    <div className="col-lg-12 mx-2 my-2">
                                        <div className="row align-items-center">
                                            <h5 className="d-inline mr-2 mb-1">Customer Reviews</h5>
                                            <span className="d-inline">(Filtered by 5 star)</span>
                                        </div>
                                        <div className="row my-2">
                                            <h4 className="d-block">4.6 Star</h4>
                                        </div>

                                        <div className="row">
                                            <small className="mr-3">Total (3,134)</small>
                                            <small className="mr-3">5 star (100)</small>
                                            <small className="mr-3">4 star (200)</small>
                                            <small className="mr-3">3 star (10)</small>
                                            <small className="mr-3">2 star (34)</small>
                                            <small className="mr-3">1 star (0)</small>
                                        </div>
                                        <div className="row d-flex my-3 mr-3">
                                            <span className="mr-auto">{`Showing 1-12 of 3134 reviews`}</span>
                                            <div className="dropdown mr-3">
                                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Sort by date: newest to oldest
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <Link className="dropdown-item">Sort by date: newest to oldest</Link>
                                                    <Link className="dropdown-item">Sort by date: oldest to newest</Link>
                                                </div>
                                            </div>
                                            <div className="dropdown">
                                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Show 15
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <Link className="dropdown-item">Show 5</Link>
                                                    <Link className="dropdown-item">Show 15</Link>
                                                    <Link className="dropdown-item">Show 20</Link>
                                                    <Link className="dropdown-item">Show 25</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mx-4 w-100" id="review-list">
                                    <div className="col-lg-12 mx-2 mt-2 pb-4 border-bottom" id="review-item">
                                        <div className="row align-items-center my-2">
                                            <h5 className="d-inline mr-2 mb-1">Itaque suscipit enim ab adipisci amet.</h5>
                                            <span className="d-inline">| 5 stars</span>
                                        </div>
                                        <div className="row my-1">
                                            <p>
                                                Voluptatem expedita consequatur aut voluptatem consequatur fugiat illum aut. Aut ullam nihil dolorem sit minima vel pariatur debitis. Ducimus rerum occaecati voluptatem. Quisquam ut dolore illum.

                                                Dolores quia tenetur consequuntur nostrum sit tenetur molestiae facere. Aut omnis molestiae cum ad quis tenetur minus. Incidunt tempore atque est iusto similique eos occaecati.

                                                Velit numquam expedita placeat hic molestiae possimus repellendus alias. Possimus ducimus dolorem a qui vero assumenda deleniti libero. Ea perferendis in ut quaerat quas blanditiis repudiandae.

                                                Vel perferendis officia aut rem. Dolorem explicabo pariatur quos consectetur. Et iste vitae architecto nihil ut nesciunt quod. Ipsum et amet corrupti ut et.
                                            </p>
                                        </div>
                                        <div className="row my-1">
                                            <span>April 12, 2021</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 mx-2 mt-2 pb-4 border-bottom" id="review-item">
                                        <div className="row align-items-center my-2">
                                            <h5 className="d-inline mr-2 mb-1">Itaque suscipit enim ab adipisci amet.</h5>
                                            <span className="d-inline">| 5 stars</span>
                                        </div>
                                        <div className="row my-1">
                                            <p>
                                                Voluptatem expedita consequatur aut voluptatem consequatur fugiat illum aut. Aut ullam nihil dolorem sit minima vel pariatur debitis. Ducimus rerum occaecati voluptatem. Quisquam ut dolore illum.

                                                Dolores quia tenetur consequuntur nostrum sit tenetur molestiae facere. Aut omnis molestiae cum ad quis tenetur minus. Incidunt tempore atque est iusto similique eos occaecati.

                                                Velit numquam expedita placeat hic molestiae possimus repellendus alias. Possimus ducimus dolorem a qui vero assumenda deleniti libero. Ea perferendis in ut quaerat quas blanditiis repudiandae.

                                                Vel perferendis officia aut rem. Dolorem explicabo pariatur quos consectetur. Et iste vitae architecto nihil ut nesciunt quod. Ipsum et amet corrupti ut et.
                                            </p>
                                        </div>
                                        <div className="row my-1">
                                            <span>April 12, 2021</span>
                                        </div>
                                    </div>

                                </div>
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
