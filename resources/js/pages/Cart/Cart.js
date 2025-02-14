import React, { Component } from "react";
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import { GetNumberCart } from '../../components/actions'
import "./index.css"

class Cart extends Component {
    constructor(props) {
        super(props);
        this.timer = null;
        this.state = {
            items: [],
            total: 0,
        };
    }

    componentDidMount() {
        let cartFromStorage = JSON.parse(localStorage.getItem('cart')) || [];
        this.setState({
            items: [...cartFromStorage]
        });
    }


    componentWillUnmount() {
        this._mounted = false;
        if (this.timer) {
            clearTimeout(this.timer);
        }
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
                    <h5 style={{ color: "#F75454" }}>${discount_price}</h5>
                    <span style={{ color: "#CCCECF" }}><del>${book_price}</del></span>
                </>
                :
                <>
                    <h5 style={{ color: "#F75454" }}>${book_price}</h5>
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
        let items = [...this.state.items];
        items = items.filter(item => item.book.id !== book_id);
        this.setState({ items }, () => {
            localStorage.setItem('cart', JSON.stringify(this.state.items));
            this.props.GET_NUMBER_CART();
            toast.info('Book has been removed from your cart', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });

    }

    resetQuantity(book_id) {
        let items = [...this.state.items];
        let productIndex = items.findIndex((obj => obj.book.id === book_id));
        items[productIndex].quantity = 1;
        this.setState({ items }, () => {
            localStorage.setItem('cart', JSON.stringify(this.state.items));
        });
    }

    openBookDetails(id) {
        window.open('/#/product/' + id, '_blank').focus();
    }


    placeOrder() {
        const items = this.state.items;
        let order_books = {
            data: []
        };
        let orders = [];
        if (items instanceof Array) {
            if (items.length === 0) {
                toast.error('Your cart is empty', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return;
            }

            items.map((item, i) => {
                let orderItem = {
                    book_id: item.book.id,
                    quantity: item.quantity,
                    price: item.book.final_price
                };
                orders.push(orderItem);
            })


            order_books = {
                ...order_books,
                data: orders
            }


            axios.post('/api/orders', order_books)
                .then((response) => {
                    toast.success('Order successfully placed', {
                        position: "bottom-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    localStorage.setItem('cart', JSON.stringify([]));
                    this.setState({
                        items: [],
                        total: 0
                    });
                    this.props.GET_NUMBER_CART();
                    this.timer = setTimeout(function () {
                        window.location = '/#/'
                    }, 10000);
                })
                .catch(error => {
                    if (error.response.status === 400) {
                        let invalid_books = error.response.data.invalid_ids ?? [];
                        if (invalid_books.length !== 0) {
                            invalid_books.map((id, i) => {
                                this.deleteItem(id);
                            })
                        }

                        let invalid_quantity = error.response.data.invalid_quantity ?? [];
                        if (invalid_quantity.length !== 0) {
                            invalid_quantity.map((id, i) => {
                                this.resetQuantity(id);
                            })
                        }

                        toast.error(error.response.data.error, {
                            position: "bottom-right",
                            autoClose: 10000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                    if (error.response.status === 404) {
                        this.props.history.push('/404')
                    }
                    if (error.response.status === 500) {
                        this.props.history.push('/500')
                    }

                });
        }
    }

    showBookList() {
        const books = this.state.items;
        if (books instanceof Array) {
            if (books.length === 0) {
                return (<tr><td></td><td>There are no books in your cart</td></tr>)
            }

            return books.map((item, i) => {
                return (
                    <tr key={i}>
                        <td className="col-2 align-items-center" style={{ cursor: 'pointer' }} onClick={() => this.openBookDetails(item.book.id)}>
                            <img

                                src={item.book.book_cover_photo === null ? ("assets/bookcover/book_default.jpg") : ("assets/bookcover/" + item.book.book_cover_photo + ".jpg")}
                                className="card-img-top" alt="Image"
                                style={{
                                    width: "100%",
                                    height: "170px"

                                }}
                            />
                        </td>
                        <td className="col-4 align-items-center" style={{ cursor: 'pointer' }} onClick={() => this.openBookDetails(item.book.id)}>
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
                                            <th className="col-4">Book</th>
                                            <th className="col-2">Price</th>
                                            <th className="col-2 text-center">Quantity</th>
                                            <th className="col-2 text-center">Total</th>
                                            <th> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.showBookList()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="row border rounded shadow-sm ml-0 mb-5 pb-4 ml-1">
                                <div className="row w-100 bg-light ml-0 mt-0">
                                    <div className="row mx-5 my-2 align-item-center w-100 justify-content-center">
                                        <h6>Cart total</h6>
                                    </div>
                                </div>
                                <div className="row mx-5 mt-3 w-100 justify-content-center">
                                    <h4 className="mr-1">${this.calculateTotalPrice()}</h4>
                                </div>

                                <div className="row mx-5 w-100">
                                    <div className="input-group my-2  justify-content-center ">
                                        {this.state.items.length === 0 ?
                                            <button onClick={() => { }} className="btn btn-default btn-block border rounded-3 mb-2" disabled>Place order</button>
                                            :
                                            <button onClick={() => this.placeOrder()} className="btn btn-primary btn-block border rounded-3 mb-2"><strong>Place order</strong></button>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer
                    position="bottom-right"
                    autoClose={10000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div >
        );
    }
}



function mapDispatchToProps(dispatch) {
    return {
        GET_NUMBER_CART: () => dispatch(GetNumberCart()),

    };
}
export default connect(null, mapDispatchToProps)(Cart)