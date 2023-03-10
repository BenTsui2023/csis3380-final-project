import React from "react";
import Filter from './Filter';
import Product from "./Product";

const Pizzas = () => (
    <>
        <div className="pizzas">
            <h1>Our Pizzas</h1>
        </div>
        <Filter />
        <Product />
    </>
)

export default Pizzas;