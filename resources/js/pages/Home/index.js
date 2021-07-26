import React, { Component } from "react";
import { BsFillCaretRightFill } from "react-icons/bs";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import './index.css';
import Slider from "../../components/Slider";
import FeaturedBooks from "./components/FeaturedBooks";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { onSaleBooks: [], recommendedBooks: [], popularBooks: [], isLoading: false };
    }
    async componentDidMount() {
        await this.getBookData();
    }


    async getBookData() {
        this.setState({ isLoading: true }, () => {
            const url = '/api/home';
            axios.get(url).then((response) => {
                this.setState({
                    onSaleBooks: response.data.onsale,
                    recommendedBooks: response.data.recommended,
                    popularBooks: response.data.popular,
                    isLoading: false
                });
            }).catch((error) => {
                if (error.response.status === 404) {
                    this.props.history.push('/404')
                }
                if (error.response.status === 500) {
                    this.props.history.push('/500')
                }
            })
        })


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
                            <div className="col-lg-3 d-flex align-items-end">
                                <h5>On Sale</h5>
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
                            {this.state.isLoading ?
                                <Loading size="sm" />
                                :
                                this.onSaleData()
                            }
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="d-flex justify-content-center mt-5 mb-3">
                        <div className="col-xs-1">
                            <div className="row justify-content-center">
                                <h4><small>Featured Books</small></h4>

                            </div>
                            <div className="row mt-2">
                                <ul className="nav nav-pills nav-fill navtop featured-book-tab ">
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
                                {this.state.isLoading ?
                                    <Loading size="sm" />
                                    :
                                    <FeaturedBooks title="Recommended" books={this.state.recommendedBooks}></FeaturedBooks>
                                }

                            </div>
                            <div className="tab-pane" role="tabpanel" id="popular">
                                {this.state.isLoading ?
                                    <Loading size="sm" />
                                    :
                                    <FeaturedBooks title="Popular" books={this.state.popularBooks}></FeaturedBooks>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
