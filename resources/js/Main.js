import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter, Link } from "react-router-dom";
import Router from "./Router";
import Header from "./components/layouts/Header";
import "./app.css";

function Main() {
    return (
        <HashRouter>
            <div className="container-fluid">
                <Header></Header>
                <div style={{ marginTop: "70px" }}>
                    <Router />
                </div>
            </div>
        </HashRouter >
    );
}

export default Main;

if (document.getElementById("main")) {
    ReactDOM.render(<Main />, document.getElementById("main"));
}
