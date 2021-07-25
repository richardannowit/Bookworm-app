import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart/Cart";
import About from "./pages/About";
import Product from './pages/Product';
import NotFound from "./pages/Error/NotFound";
import InternalServer from "./pages/Error/InternalServer";

export default class Router extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/shop" component={Shop} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/about" component={About} />
                <Route exact path="/product/:id" component={Product} />
                <Route path="/404" component={NotFound} />
                <Route path="/500" component={InternalServer} />
                <Route path="*" component={NotFound} />
            </Switch>
        );
    }
}
