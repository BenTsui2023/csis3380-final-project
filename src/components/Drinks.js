import React from "react";
import Filter from './Filter';
import Product from "./Product";

const Drinks = () => (
    <>
        <div className="drinks">
            <h1>Our Drinks</h1>
        </div>
        <Filter />
        <Product />
    </>
)

export default Drinks;