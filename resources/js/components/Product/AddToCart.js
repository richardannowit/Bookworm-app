import React, { Component } from 'react'

export default class AddToCart extends Component {


    showPrice() {
        let haveDiscount = (this.props.discount_price !== null) ? true : false;
        return (
            haveDiscount ?
                <>
                    <span className="mr-1"><del>${this.props.book_price}</del></span>
                    <h5 className="mr-2">${this.props.discount_price}</h5>
                </>
                :
                <>
                    <h5 className="mr-2">${this.props.book_price}</h5>
                </>
        );
    }


    render() {
        return (
            <>
                <div className="row w-100 bg-light ml-0 mt-0">
                    <div className="row mx-5 my-2 align-item-center w-100">
                        {this.showPrice()}
                    </div>
                </div>
                <div className="row mx-5 mt-3 w-100">
                    <span className="mr-1">Quality</span>
                </div>
                <div className="row mx-5 w-100 justify-content-center">
                    <div className="input-group my-2">
                        <button type="submit" className="btn btn-default border rounded-0 mb-2">-</button>
                        <input className="form-control rounded-0" type="text" defaultValue={1} min={1} max={10} style={{ textAlign: 'center' }} />
                        <button type="submit" className="btn btn-default border rounded-0 mb-2">+</button>
                    </div>
                </div>

                <div className="row mx-5 w-100">
                    <div className="input-group my-2  justify-content-center ">
                        <button type="submit" className="btn btn-default btn-block border rounded-0 mb-2 bg-light"><strong>Add to cart</strong></button>
                    </div>
                </div>
            </>
        )
    }
}
