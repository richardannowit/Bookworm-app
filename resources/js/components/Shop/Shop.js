import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import BookList from "./BookList";
import {
    BrowserRouter as Router,
    useLocation
} from "react-router-dom";

function Shop(props) {

    let query = new URLSearchParams(useLocation().search);
    // let filter = query.get("filter");
    // let sort = query.get("sort");
    // let page = query.get("page");
    return (

        <Router>
            <div className="container-fluid">
                <div className="container-fluid pb-3" style={{ width: '90%' }}>
                    <div className="row pt-3">
                        <div className="d-inline mr-2">
                            <h5>Books</h5>
                        </div>
                        <div className="d-inline">
                            <span>(Filtered by Category #1 {query.get("page")})</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <hr />
                        </div>
                    </div>
                </div>


                <div className="container-fluid pb-5 mb-2" style={{ width: '90%' }}>
                    <div className="row">
                        <aside className="col-lg-2">
                            <Filter />
                        </aside>

                        <section className="col-lg-10" >
                            <BookList filter={query.get("filter")} sort={query.get("sort")} page={query.get("page")} />
                        </section>
                    </div>
                </div>
            </div>
        </Router>
    );
}


export default Shop;