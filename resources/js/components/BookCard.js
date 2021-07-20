import React, { Component } from 'react'
import {
    Link,
} from "react-router-dom";

export default class BookCard extends Component {


    showPrice() {
        let haveDiscount = (this.props.discount_price !== null) ? true : false;
        return (
            haveDiscount ?
                <div>
                    <div className="d-inline p-2"><del>${this.props.price}</del></div>
                    <div className="d-inline p-2"><strong>${this.props.discount_price}</strong></div>
                </div>
                :
                <div>
                    <div className="d-inline p-2"><strong>${this.props.price}</strong></div>
                </div>
        );
    }

    render() {

        const { id, title, author, cover, price, discount_price } = this.props;
        return (
            <Link to={"/product/" + id}>
                <div className="card" id={id}>
                    <img
                        src={cover === null ? ("http://placehold.it/200x250") : ("assets/bookcover/" + cover + ".jpg")}
                        className="card-img-top" alt="Image"
                        style={{
                            width: "100%",
                            height: "250px"

                        }}
                    />
                    <div className="card-body">
                        <h6 className="card-title"
                            style={{
                                display: "inline-block",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                width: "95%",
                            }}
                        >
                            {title}
                        </h6>
                        <p className="card-text">
                            {author}
                        </p>
                        <hr />
                        {this.showPrice()}
                    </div>
                </div>
            </Link>
        )
    }
}
