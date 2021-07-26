import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import { connect } from 'react-redux'
import { GetNumberCart } from '../../../components/actions'


class AddToCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1
        };
    }


    showPrice() {
        let haveDiscount = (this.props.bookDetails.discount_price !== null) ? true : false;
        return (
            haveDiscount ?
                <>
                    <span className="mr-1" style={{ color: "#CCCECF" }}><del>${this.props.bookDetails.book_price}</del></span>
                    <h5 className="mr-2" style={{ color: "#F75454" }}>${this.props.bookDetails.discount_price}</h5>
                </>
                :
                <>
                    <h5 className="mr-2" style={{ color: "#F75454" }}>${this.props.bookDetails.book_price}</h5>
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

    addToCart(book) {
        let book_id = book.id;
        let bookPackage = {
            "book": book,
            "quantity": this.state.quantity
        }
        let cartFromStorage = JSON.parse(localStorage.getItem('cart')) || [];
        let productIndex = cartFromStorage.findIndex((obj => obj.book.id === book_id));
        if (productIndex !== -1) {
            cartFromStorage[productIndex].quantity = this.state.quantity;
        } else {
            cartFromStorage.push(bookPackage);
        }

        localStorage.setItem('cart', JSON.stringify(cartFromStorage));
        this.props.GET_NUMBER_CART();

        toast.success('This book has been added to cart.', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    }


    render() {
        return (
            <>
                <div className="row w-100 bg-light ml-0 mt-0" >
                    <div className="row mx-5 my-2 align-item-center w-100">
                        {this.showPrice()}
                    </div>
                </div>
                <div className="row mx-5 mt-3 w-100">
                    <span className="mr-1">Quantity</span>
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
                        <button onClick={() => this.addToCart(this.props.bookDetails)} className="btn btn-primary btn-block border rounded-3 mb-2">
                            <span>Add to cart</span>
                        </button>
                    </div>
                </div>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        GET_NUMBER_CART: () => dispatch(GetNumberCart()),

    };
}
export default connect(null, mapDispatchToProps)(AddToCart)
