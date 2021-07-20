import React, { Component } from "react";
import { connect } from 'react-redux'
import { GetNumberCart } from '../../components/actions'
import "./index.css"

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            total: 0
        };
    }

    componentDidMount() {
        let cartFromStorage = JSON.parse(localStorage.getItem('cart')) || [];
        this.setState({
            items: [...cartFromStorage]
        });
    }


    calculateTotalPrice() {
        let items = this.state.items;
        let total = 0;
        items.map((item, i) => {
            total += item.book.final_price * item.quantity;
        })
        return total.toFixed(2);
    }


    showPrice(discount_price, book_price) {
        let haveDiscount = (discount_price !== null) ? true : false;
        return (
            haveDiscount ?
                <>
                    <h5>${discount_price}</h5>
                    <span style={{ color: "#CCCECF" }}><del>${book_price}</del></span>
                </>
                :
                <>
                    <h5>${book_price}</h5>
                </>
        );
    }

    increaseQuantity(book_id) {
        let items = [...this.state.items];
        let productIndex = items.findIndex((obj => obj.book.id === book_id));
        if (items[productIndex].quantity === 8) return;
        let item = {
            ...items[productIndex],
            quantity: items[productIndex].quantity + 1
        }

        items[productIndex] = item;
        this.setState({ items }, () => {
            localStorage.setItem('cart', JSON.stringify(this.state.items));
        });
    }

    decreaseQuantity(book_id) {
        let items = [...this.state.items];
        let productIndex = items.findIndex((obj => obj.book.id === book_id));
        if (items[productIndex].quantity === 1) {
            this.deleteItem(book_id);
            return;
        }
        let item = {
            ...items[productIndex],
            quantity: items[productIndex].quantity - 1
        }

        items[productIndex] = item;
        this.setState({ items }, () => {
            localStorage.setItem('cart', JSON.stringify(this.state.items));
        });
    }


    deleteItem(book_id) {
        if (confirm('Do you want to remove this book from the cart?')) {
            let items = [...this.state.items];
            items = items.filter(item => item.book.id !== book_id);
            this.setState({ items }, () => {
                localStorage.setItem('cart', JSON.stringify(this.state.items));
                this.props.GET_NUMBER_CART();
            });
        } else {
            return;
        }

    }

    showItems() {
        const items = this.state.items;
        if (items instanceof Array) {
            if (items.length === 0) {
                return (<tr><td></td><td>There are no book in cart</td></tr>)
            }

            return items.map((item, i) => {
                return (
                    <tr key={i}>
                        <td className="col-2 align-items-center">
                            <img
                                src={item.book.book_cover_photo === null ? ("http://placehold.it/150x170") : ("assets/bookcover/" + item.book.book_cover_photo + ".jpg")}
                                className="card-img-top" alt="Image"
                                style={{
                                    width: "100%",
                                    height: "170px"

                                }}
                            />
                        </td>
                        <td className="col-4 align-items-center">
                            <h4>{item.book.book_title}</h4>
                            <span>{item.book.author_name}</span>
                        </td>
                        <td className="col-2 align-items-center">
                            {this.showPrice(item.book.discount_price, item.book.book_price)}
                        </td>
                        <td className="col-2 align-items-center">
                            <div className="row">
                                <button onClick={() => { this.decreaseQuantity(item.book.id) }} className="btn btn-default border rounded-0 col-2">-</button>
                                <input className="form-control rounded-0 col-8" type="text" onChange={(e) => { }} value={item.quantity} style={{ textAlign: 'center' }} />
                                <button onClick={() => { this.increaseQuantity(item.book.id) }} className="btn btn-default border rounded-0 col-2">+</button>
                            </div>
                        </td>
                        <td className=" text-center col-2 mx-auto align-items-center text-align-right">
                            <h5>${(item.book.final_price * item.quantity).toFixed(2)}</h5>
                        </td>
                    </tr>
                );
            });
        }
    }


    render() {
        return (
            <div className="container-fluid">
                <div className="container-fluid pb-3" style={{ width: '90%' }}>
                    <div className="row pt-3">
                        <div className="mr-2">
                            <h5>Your Cart: {this.state.items.length} {this.state.items.length <= 1 ? 'item' : 'items'}</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <hr />
                        </div>
                    </div>


                </div>

                <div className="container-fluid pb-3" style={{ width: '90%' }}>
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="row border rounded shadow-sm ml-0 mr-1 pb-4">
                                <table className="table table-reponsible" style={{ width: "100%" }}>
                                    <thead>
                                        <tr>
                                            <th className="col-2"> </th>
                                            <th className="col-4">Product</th>
                                            <th className="col-2">Price</th>
                                            <th className="col-2 text-center">Quantity</th>
                                            <th className="col-2 text-center">Total</th>
                                            <th> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.showItems()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="row border rounded shadow-sm ml-0 mb-5 pb-4 ml-1">
                                <div className="row w-100 bg-light ml-0 mt-0">
                                    <div className="row mx-5 my-2 align-item-center w-100 justify-content-center">
                                        <h6>Cart totals</h6>
                                    </div>
                                </div>
                                <div className="row mx-5 mt-3 w-100 justify-content-center">
                                    <h4 className="mr-1">${this.calculateTotalPrice()}</h4>
                                </div>

                                <div className="row mx-5 w-100">
                                    <div className="input-group my-2  justify-content-center ">
                                        <button onClick={() => { }} className="btn btn-default btn-block border rounded-0 mb-2 bg-light"><strong>Place order</strong></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}



function mapDispatchToProps(dispatch) {
    return {
        GET_NUMBER_CART: () => dispatch(GetNumberCart()),

    };
}
export default connect(null, mapDispatchToProps)(Cart)