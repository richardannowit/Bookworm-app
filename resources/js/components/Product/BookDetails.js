import React, { Component } from 'react'

export default class BookDetails extends Component {
    render() {
        return (
            <>
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
            </>
        )
    }
}
