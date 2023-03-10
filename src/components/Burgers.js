import React from "react";
import Filter from './Filter';
import Product from "./Product";

const Burgers = () => (
    <>
        <div className="burgers">
            <h1>Our Burgers</h1>
        </div>
        <Filter />
        <Product />
    </>
)

export default Burgers;