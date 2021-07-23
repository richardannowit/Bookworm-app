import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './error.css'

export default class InternalServer extends Component {
    render() {
        return (
            <div className="container" style={{ minHeight: "500px" }}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="error-template">
                            <img
                                src="assets/error/Internal_Server_Error.jpg"
                                alt="500-error"
                                height="400px"
                                width="400px"
                            />
                            <div className="error-details">
                                The server is not responding, please contact your administrator
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
