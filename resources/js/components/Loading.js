import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap'

export default class Loading extends Component {
    showSpinner() {
        let spinners = [1, 2, 3];
        return spinners.map((spinner, i) => {
            return <Spinner
                key={i}
                as="span"
                className="mr-4"
                variant="danger"
                size={this.props.size ?? ""}
                role="status"
                aria-hidden="true"
                animation="grow"
            />
        })
    }
    render() {
        return (
            <div className="d-flex justify-content-center my-5">
                {this.showSpinner()}
            </div>
        )
    }
}
