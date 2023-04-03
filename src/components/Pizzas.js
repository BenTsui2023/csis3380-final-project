import React from "react";
import { useState, useEffect } from "react";
import Filter from './Filter';
import Product from "./Product";

const Pizzas = () => {
    const [mealData, setMealData] = useState([]);
    const [mealPrice] = useState([{price: 10.3}, {price: 12.4}, {price: 7.2}, {price: 12.0}, {price: 23.4}, {price: 2.9}, {price: 12.6}, {price: 8.9}, {price: 7.6}, {price: 5.9}, {price: 15.9}, {price: 21.0}, {price: 17.3}, {price: 12.9}]);
    const [mealDataWithPrice, setMealDataWithPrice] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetch(
        // "https://api.spoonacular.com/food/menuItems/search?apiKey=6e6ba03597a84042837973e85d2f2a7d&query=burger&number=8"
        'https://www.themealdb.com/api/json/v1/1/categories.php'
        )
        .then((response) => response.json())
        .then((data) => {
            setMealData(data.categories);
            //console.log(data.categories)
        })
        .catch(() => {
            console.log("error");
        });
    }, []);

    useEffect(() => {
        // Combine mealData and mealPrice into a new array of objects
        const newData = mealData.map((data, index) => ({...data, ...mealPrice[index]}));
        setMealDataWithPrice(newData);
        setFilteredData(newData)
    }, [mealData, mealPrice]);
    //console.log(filteredData)

    function handleFilterChange({ name, minPrice, maxPrice }) {
        let newData = [...mealDataWithPrice];

        if (name) {
        newData = newData.filter((item) =>
            item.strCategory.toLowerCase().includes(name.toLowerCase())
        );
        }

        if (maxPrice) {
        newData = newData.filter((item) => item.price <= maxPrice);
        }

        if (minPrice) {
        newData = newData.filter((item) => item.price >= minPrice);
        }

        setFilteredData(newData);
    }

    function handleReset() {
        setFilteredData(mealDataWithPrice);
    }

    return(
    <>
        <div className="pizzas">
            <h1>Our Pizzas</h1>
        </div>
        <div className='filter'> <Filter onFilterChange={handleFilterChange} onReset={handleReset} /></div>
        <div className='wrapperForProductList'>
            {filteredData.map(menu => (
                <Product
                    key={menu.idCategory}
                    image={menu.strCategoryThumb}
                    title={menu.strCategory}
                    price={menu.price}
                />
                ))
            }
        </div>
    </>
    )
}

export default Pizzas;