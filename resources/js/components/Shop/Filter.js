import React, { Component } from 'react'

export default class Filter extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <h6>Filter by</h6>
                </div>
                <div className="row">
                    <div className="custom-accordion w-100 rounded-2 shadow-lg" id="accordion_1">
                        <div className="accordion-item active">
                            <h2 className="mb-0">
                                <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    <span className="wrap-icon mr-3">
                                        <span className="icon-person_outline" />
                                    </span>
                                    Category
                                </button>
                            </h2>
                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion_1" style={{}}>
                                <div className="accordion-body">
                                    <ul className="custom-menu">
                                        <li><a href="#">towne</a></li>
                                        <li><a href="#">block</a></li>
                                        <li><a href="#">kozey</a></li>
                                        <li><a href="#">price</a></li>
                                        <li><a href="#">yundt</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item active">
                            <h2 className="mb-0">
                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    <span className="wrap-icon mr-3">
                                        <span className="icon-mail_outline" />
                                    </span>
                                    Author
                                </button>
                            </h2>
                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion_1" style={{}}>
                                <div className="accordion-body">
                                    <ul className="custom-menu">
                                        <li><a href="#">Prof. Roselyn Weber DVM</a></li>
                                        <li><a href="#">Kennedi Gusikowski</a></li>
                                        <li><a href="#">Mrs. Cassie Weber MD</a></li>
                                        <li><a href="#">Esther Greenholt</a></li>
                                        <li><a href="#">Prof. Dale Gulgowski</a></li>
                                        <li><a href="#">Mr. Ricardo Dibbert</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="mb-0">
                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    <span className="wrap-icon mr-3">
                                        <span className="icon-gear" />
                                    </span>
                                    Rating Review
                                </button>
                            </h2>
                            <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion_1">
                                <div className="accordion-body">
                                    <ul className="custom-menu">
                                        <li><a href="#">1 Star</a></li>
                                        <li><a href="#">2 Star</a></li>
                                        <li><a href="#">3 Star</a></li>
                                        <li><a href="#">4 Star</a></li>
                                        <li><a href="#">5 Star</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
