import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import './App.css';

const Product = (props) => {
  return(
    <div className='wrapperForProduct'>
      {/* <div className='wrapperForProductImage'> */}
        <label class="label"><img src={props.image} class="label_image"></img></label>
      {/* </div> */}
      <div className='wrapperForProductDesc'>
        <ul>
        <li>{props.title}</li>
        <li>{props.price}</li>
        </ul>
      </div>
    </div>
  )
}

function App() {

  const [mealData, setMealData] = useState([]);
  const [mealPrice, setMealPrice] = useState([{price:10.2},{price:10.2},{price:10.2},{price:10.2},{price:10.2},{price:10.2},{price:10.2},{price:10.2}]);
  const [mealDataWithPrice, setMealDataWithPrice] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.spoonacular.com/food/menuItems/search?apiKey=6e6ba03597a84042837973e85d2f2a7d&query=burger&number=8"
      //'www.themealdb.com/api/json/v1/1/filter.php?apiKey=1&c=Seafood'
    )
      .then((response) => response.json())
      .then((data) => {
        setMealData(data.menuItems);
        console.log(data.menuItems)
      })
      .catch(() => {
        console.log("error");
      });
  }, []);

  useEffect(() => {
    // Combine mealData and mealPrice into a new array of objects
    const newData = mealData.map((data, index) => ({...data, ...mealPrice[index]}));
    setMealDataWithPrice(newData);
  }, [mealData, mealPrice]);

  return (
    <div className = "App">
      <div className='header'><p>Online Restaurant</p></div>
      <div className='filter'><p>This is filter</p></div>
      <div className='wrapperForProductList'>
        {mealDataWithPrice.map(menu =>
          <Product
            key={menu.id}
            image={menu.image}
            title={menu.title}
            price={menu.price}
          />
        )}
      </div>
    </div>
  );
}

export default App;
