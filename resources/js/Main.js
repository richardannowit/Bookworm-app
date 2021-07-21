import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter, Link } from "react-router-dom";
import Router from "./Router";
import Header from "./pages/layouts/Header";
import "./app.css";
import { Provider } from 'react-redux';
import store from './components/stores'
import Footer from "./pages/layouts/Footer";


function Main() {
    return (
        <HashRouter>
            <div className="wrapper" style={{ position: 'relative' }}>
                <Header></Header>
                <div style={{ marginTop: "70px" }}>
                    <Router />
                </div>
                <Footer></Footer>
            </div>
        </HashRouter >
    );
}

export default Main;

if (document.getElementById("main")) {
    ReactDOM.render(
        <Provider store={store}>
            <Main />
        </Provider>,
        document.getElementById("main")
    );
}
