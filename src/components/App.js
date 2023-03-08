import React, { useState, useEffect } from "react";
//import NavBar from './NavBar';
import Product from "./Product";
import '../css/App.css';


function App() {

  const [mealData, setMealData] = useState([]);
  const [mealPrice] = useState([{price:10.2},{price:10.2},{price:10.2},{price:10.2},{price:10.2},{price:10.2},{price:10.2},{price:10.2}]);
  //const [mealDataWithPrice, setMealDataWithPrice] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.spoonacular.com/food/menuItems/search?apiKey=6e6ba03597a84042837973e85d2f2a7d&query=burger&number=8"
    )
      .then((response) => response.json())
      .then((data) => {
        setMealData(data.menuItems);
        //console.log(data.menuItems)
      })
      .catch(() => {
        console.log("error");
      });
  }, []);

  // useEffect(() => {
  //   // Combine mealData and mealPrice into a new array of objects
  //   const newData = mealData.map((data, index) => ({...data, ...mealPrice[index]}));
  //   setMealDataWithPrice(newData);
  // }, [mealData, mealPrice]);

  return (
    <div className = "App">
      <div className='header'><p>Online Restaurant</p></div>
      {/* <NavBar /> */}
      <div className='filter'><p>This is filter</p></div>
      <div className='wrapperForProductList'>
        {mealData.map((menu , index) =>
          <Product
            key={menu.id}
            image={menu.image}
            title={menu.title}
            price={mealPrice[index].price}
          />
        )}
      </div>
    </div>
  );
}

export default App;
