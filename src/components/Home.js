import React from "react";
import { useState, useEffect } from "react";
import Product from "./Product";
import Filter from './Filter';

const Home = () => {

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
    <div className="home">
      <div className="desc">
        <h1>Welcome!</h1>
        <p>Welcome to our online ordering website! We are thrilled to offer you a hassle-free and convenient way to order your favorite meals from the comfort of your home or office. Our menu features a wide range of delicious options, including burgers, pizzas, and drinks. Whether you're in the mood for a classic cheeseburger or a cheesy pizza, we have something for everyone. Our food is always fresh, prepared with high-quality ingredients, and served quickly to ensure that you can enjoy your meal without any delay. So go ahead and browse our menu, customize your order, and get ready to indulge in a tasty and satisfying meal!</p>
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
    </div>
  )
  }

export default Home;