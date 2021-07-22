import React, { Component } from 'react'
import { Link, NavLink } from "react-router-dom";
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
                        <NavLink exact to={"/"} activeClassName="active" className="nav-link">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to={"/shop"} activeClassName="active" className="nav-link">Shop</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to={"/about"} activeClassName="active" className="nav-link">About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to={"/cart"} activeClassName="active" className="nav-link">Cart({this.props.numberCart})</NavLink>
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
