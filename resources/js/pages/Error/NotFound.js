import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class NotFound extends Component {
    render() {
        return (
            <div className="container" style={{ minHeight: "500px" }}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="error-template">
                            <img
                                src="assets/error/Page_Not_Found.jpg"
                                alt="404-error"
                                height="400px"
                                width="400px"
                            />
                            <div className="error-details">
                                Oops! The page your are looking for cannot be accessed!
                            </div>
                            <div className="error-actions">
                                <Link to={'/'} className="btn btn-primary btn-lg"><span className="glyphicon glyphicon-home" />
                                    Back Home
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
