import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Cart from "./pages/Cart/Cart";
import About from "./pages/About";
import Product from './pages/Product/Product';
import NotFound from "./pages/NotFound";

export default class Router extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/shop" component={Shop} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/about" component={About} />
                <Route exact path="/product/:id" component={Product} />
                <Route path="*" component={NotFound} />
            </Switch>
        );
    }
}
