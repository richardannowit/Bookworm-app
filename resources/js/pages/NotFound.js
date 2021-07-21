import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class NotFound extends Component {
    render() {
        return (
            <div className="not-found">
                <img
                    src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
                    alt="not-found"
                />
                <Link to="/" className="link-home ml-5">
                    <button className="btn btn-primary">Go Home</button>
                </Link>
            </div>
        )
    }
}
