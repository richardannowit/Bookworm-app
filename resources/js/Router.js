import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Shop from "./components/Shop/Shop";
import Cart from "./components/Cart/Cart";
import About from "./components/About";

export default class Router extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/shop" component={Shop} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/about" component={About} />
                {/* <Route exact path="/add-product" component={AddProduct} />
                <Route exact path="/edit-product/:id" component={EditProduct} />
                <Route exact path="/product" component={Product} /> */}
            </Switch>
        );
    }
}
