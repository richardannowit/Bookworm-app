import React, { Component } from 'react'

export default class AddToCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1
        };
    }


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

    increaseQuantity() {
        let quantity = this.state.quantity;
        if (quantity === 8) return;
        this.setState({
            quantity: this.state.quantity + 1
        });
    }

    decreaseQuantity() {
        let quantity = this.state.quantity;
        if (quantity === 1) return;
        this.setState({
            quantity: this.state.quantity - 1
        });
    }

    addToCart(book_id) {
        let bookPackage = {
            "id": book_id,
            "quantity": this.state.quantity
        }
        let cartFromStorage = JSON.parse(localStorage.getItem('cart')) || [];
        let productIndex = cartFromStorage.findIndex((obj => obj.id === book_id));
        console.log(productIndex);
        if (productIndex !== -1) {
            cartFromStorage[productIndex].quantity = this.state.quantity;
        } else {
            cartFromStorage.push(bookPackage);
        }

        localStorage.setItem('cart', JSON.stringify(cartFromStorage));
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
                        <button onClick={() => this.decreaseQuantity()} className="btn btn-default border rounded-0 mb-2">-</button>
                        <input className="form-control rounded-0" type="text" onChange={(e) => { }} value={this.state.quantity} style={{ textAlign: 'center' }} />
                        <button onClick={() => this.increaseQuantity()} className="btn btn-default border rounded-0 mb-2">+</button>
                    </div>
                </div>

                <div className="row mx-5 w-100">
                    <div className="input-group my-2  justify-content-center ">
                        <button onClick={() => this.addToCart(this.props.book_id)} className="btn btn-default btn-block border rounded-0 mb-2 bg-light"><strong>Add to cart</strong></button>
                    </div>
                </div>
            </>
        )
    }
}
