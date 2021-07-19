import React, { Component } from 'react'

export default class WriteReview extends Component {
    render() {
        return (
            <>
                <div className="row w-100 border-bottom ml-0 mt-0 mb-3">
                    <div className="row mx-5 my-2 w-100">
                        <h5 className="mr-2">Write a review</h5>
                    </div>
                </div>
                <div className="row mx-5 w-100">
                    <div className="mb-2 w-100">
                        <label htmlFor="exampleInputEmail1">Add a title</label>
                        <input type="text" className="form-control" placeholder="Title" />
                    </div>
                    <div className="mt-2 mb-2 w-100">
                        <label htmlFor="exampleInputPassword1">Details please! Your review helps other shoppers</label>
                        <textarea className="form-control" rows="3"></textarea>
                    </div>

                    <div className="mt-2 mb-2 w-100">
                        <label htmlFor="exampleFormControlSelect1">Select a rating star</label>
                        <select className="form-control">
                            <option>1 Star</option>
                            <option>2 Star</option>
                            <option>3 Star</option>
                            <option>4 Star</option>
                            <option>5 Star</option>
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
            </>
        )
    }
}
