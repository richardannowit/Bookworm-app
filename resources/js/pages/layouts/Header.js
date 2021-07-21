import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import logo from '../../../assets/bookworm_logo.svg'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: 0
        }
    }
    render() {
        return (
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">

                <Link className="navbar-brand mr-auto" to={"/"}>

                    <img src={logo} className="logo-footer" />
                </Link>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to={"/"}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/shop"}>Shop</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/about"}>About</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/cart"}>Cart({this.props.numberCart})</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}


const mapStateToProps = state => {
    return { numberCart: state._todoCart.numberCart };
};
export default connect(mapStateToProps, null)(Header);
