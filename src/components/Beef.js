import React from "react";
import { useState, useEffect } from "react";
import Filter from './Filter';
import Product from "./Product";

const Beef = () => {
    const [beefMealsData, setBeefMealsData] = useState([]);
    const [mealPrice] = useState([{price: 10.3}, {price: 12.4}, {price: 7.2}, {price: 12.0}, {price: 23.4}, {price: 2.9}, {price: 12.6}, {price: 8.9}, {price: 7.6}, {price: 5.9}, {price: 15.9}, {price: 21.0}, {price: 17.3}, {price: 12.9}]);
    const [beefMealsDataWithPrice, setbeefMealsDataWithPrice] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=beef')
          .then(response => response.json())
          .then(data => {
            const beefMealPromises = data.meals.slice(0, 10).map(meal =>
              fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
                .then(response => response.json())
                .then(mealData => {
                  const { strMeal, strMealThumb, idMeal } = mealData.meals[0];
                  const ingredients = [];
                  for (let i = 1; i <= 20; i++) {
                    if (mealData.meals[0][`strIngredient${i}`]) {
                      ingredients.push(`${mealData.meals[0][`strIngredient${i}`]}`);
                    }
                  }
                  const meal = { mealName: strMeal, mealImage: strMealThumb, mealId: idMeal, mealIngredients: ingredients };
                  return meal;
                })
            );
    
            Promise.all(beefMealPromises)
              .then(meals => {
                setBeefMealsData(meals);
              })
              .catch(error => {
                console.log('Error fetching meal details:', error);
              });
          })
          .catch(error => {
            console.log('Error fetching beef meals:', error);
          });
      }, []);

    useEffect(() => {
        // Combine mealData and mealPrice into a new array of objects
        const newData = beefMealsData.map((data, index) => ({...data, ...mealPrice[index]}));
        setbeefMealsDataWithPrice(newData);
        setFilteredData(newData)
    }, [beefMealsData, mealPrice]);
    //console.log(filteredData)

    function handleFilterChange({ name, minPrice, maxPrice }) {
        let newData = [...beefMealsDataWithPrice];

        if (name) {
        newData = newData.filter((item) =>
            item.mealName.toLowerCase().includes(name.toLowerCase())
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
        setFilteredData(beefMealsDataWithPrice);
    }

    return(
        <div className="wrapper">
            <div className="desc">
                <h1>Our Beef</h1>
            </div>
        
            <div className='filter'> <Filter onFilterChange={handleFilterChange} onReset={handleReset} /></div>
            <div className='wrapperForProductList'>
                {filteredData.map(menu => (
                    <Product
                        key={menu.mealId}
                        id={menu.mealId}
                        desc={menu.description}
                        image={menu.mealImage}
                        title={menu.mealName}
                        price={menu.price}
                        ingredients={menu.mealIngredients}
                    />
                    ))
                }
            </div>
        </div>
    )
}

export default Beef;