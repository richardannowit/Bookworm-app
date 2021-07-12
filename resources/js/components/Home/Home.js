import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BsFillCaretRightFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import Slider from "../common/Slider";
import FeaturedBooks from "./FeaturedBooks";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { onSaleBooks: [], recommendedBooks: [], popularBooks: [] };
    }
    componentDidMount() {
        //Get onsale books
        axios.get("/api/home/onsale").then((response) => {
            this.setState({ onSaleBooks: response.data });
        }).catch(function (error) {
            console.log(error);
        });

        //Get recommended books
        axios.get("/api/home/recommended").then((response) => {
            this.setState({ recommendedBooks: response.data });
        }).catch(function (error) {
            console.log(error);
        });

        //Get recommended books
        axios.get("/api/home/popular").then((response) => {
            this.setState({ popularBooks: response.data });
        }).catch(function (error) {
            console.log(error);
        });
    }

    onSaleData() {
        if (this.state.onSaleBooks instanceof Array) {
            return <Slider books={this.state.onSaleBooks}></Slider>

        }
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="container-fluid">
                    <div className="container">
                        <div className="row py-3">
                            <div className="col-lg-3">
                                <h4><small>On Sale</small></h4>
                            </div>
                            <div className="col-lg-6"></div>
                            <div className="col-lg-3">
                                <Link className="nav-link" to={"/shop"}>
                                    <button type="button" className="btn btn-dark float-right">
                                        View All
                                        <BsFillCaretRightFill></BsFillCaretRightFill>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            {this.onSaleData()}
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="d-flex justify-content-center mt-5 mb-3">
                        <div className="col-xs-1">
                            <div className="row justify-content-center">
                                <h4><small>Featured Book</small></h4>

                            </div>
                            <div className="row mt-2">
                                <ul className="nav nav-pills nav-fill navtop">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#recommended" data-toggle="tab">Recommended</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#popular" data-toggle="tab">Popular</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                        <div className="tab-content">
                            <div className="tab-pane active" role="tabpanel" id="recommended">
                                <FeaturedBooks title="Recommended" books={this.state.recommendedBooks}></FeaturedBooks>
                            </div>
                            <div className="tab-pane" role="tabpanel" id="popular">
                                <FeaturedBooks title="Popular" books={this.state.popularBooks}></FeaturedBooks>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
