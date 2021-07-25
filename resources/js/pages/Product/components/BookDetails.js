import React, { Component } from 'react'

export default class BookDetails extends Component {


    constructor(props) {
        super(props);
    }

    render() {
        const { book_cover_photo, author_name, book_title, book_summary } = this.props.details;
        return (
            <>
                <div className="col-lg-3 pr-4">
                    <div className="row">
                        <img
                            src={(book_cover_photo === null || book_cover_photo === undefined) ? ("assets/bookcover/book_default.jpg") : ("assets/bookcover/" + book_cover_photo + ".jpg")}
                            style={{
                                width: "100%",
                                height: "270px"

                            }}
                        />
                    </div>
                    <div className="row mt-2">
                        <small className="w-100 text-lg-right">
                            By (author) <strong>{author_name}</strong>
                        </small>
                    </div>
                </div>
                <div className="col-lg-9 pl-4 pt-3 pr-5">
                    <div className="row">
                        <h4>{book_title}</h4>
                    </div>
                    <div className="row">
                        <p className="pt-1">
                            {book_summary}
                        </p>
                    </div>
                </div>
            </>
        )
    }
}
