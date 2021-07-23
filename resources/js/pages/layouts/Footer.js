import React, { Component } from 'react'
import { FaMapMarkerAlt } from "react-icons/fa";
import logo from '../../../assets/bookworm_logo.svg'


export default class Footer extends Component {
    render() {
        return (
            <footer className="footer border-top bg-dark py-4 mt-2" style={{ width: "100%" }}>
                <div className="container-fluid w-100">
                    <div className="row">
                        <div className="col-lg-auto mt-5 ml-4 mr-2">
                            <img src={logo} className="align-middle" />
                        </div>
                        <div className="col-lg-4" style={{ color: "white" }}>
                            <div className="row mb-2">
                                <div className="col-1"></div>
                                <div className="col">
                                    <h4>Bookworm</h4>
                                </div>

                            </div>
                            <div className="row mb-4">
                                <div className="col-1">
                                    <FaMapMarkerAlt></FaMapMarkerAlt>
                                </div>
                                <div className="col-auto">
                                    <span>21 Revolution Street </span>
                                    <strong>Paris, France</strong>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-1">
                                    <i className="fa fa-phone" />
                                </div>
                                <div className="col-auto">
                                    <p>+1 555 123456</p>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}
