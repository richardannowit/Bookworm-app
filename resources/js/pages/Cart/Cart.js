import React, { Component } from "react";
import "./index.css"

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
        };
    }

    componentDidMount() {
        let cartFromStorage = JSON.parse(localStorage.getItem('cart')) || [];
        console.log(cartFromStorage[0]);
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="container-fluid pb-3" style={{ width: '90%' }}>
                    <div className="row pt-3">
                        <div className="mr-2">
                            <h5>Your Cart: 3 items</h5>
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
                                        <tr>
                                            <td className="col-2 align-items-center"><img src="https://dummyimage.com/150x170/55595c/fff" /> </td>
                                            <td className="col-4 align-items-center">
                                                <h4>Nobis iusto consequatur animi.</h4>
                                                <span>Author name</span>
                                            </td>
                                            <td className="col-2 align-items-center">
                                                <h5>$29.98</h5>
                                                <span style={{ color: "#CCCECF" }}><del>$49.99</del></span>
                                            </td>
                                            <td className="col-2 align-items-center">
                                                <div className="row">
                                                    <button onClick={() => { }} className="btn btn-default border rounded-0 col-2">-</button>
                                                    <input className="form-control rounded-0 col-8" type="text" onChange={(e) => { }} value={1} style={{ textAlign: 'center' }} />
                                                    <button onClick={() => { }} className="btn btn-default border rounded-0 col-2">+</button>
                                                </div>
                                            </td>
                                            <td className=" text-center col-2 mx-auto align-items-center text-align-right">
                                                <h5>$59.98</h5>
                                            </td>
                                        </tr>
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
                                    <h4 className="mr-1">$99.97</h4>
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
