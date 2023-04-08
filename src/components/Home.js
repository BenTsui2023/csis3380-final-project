import React from "react";
import { useState, useEffect } from "react";
import Product from "./Product";
import Filter from './Filter';

const Home = () => {

  const [mealData, setMealData] = useState([]);
  const [mealPrice] = useState([{ price: 10.3, description: "This is product A" }, { price: 12.4, description: "This is product A" }, { price: 7.2, description: "This is product A" }, { price: 12.0, description: "This is product A" }, { price: 23.4, description: "This is product A" }, { price: 2.9, description: "This is product A" }, { price: 12.6, description: "This is product A" }, { price: 8.9, description: "This is product A" }, { price: 7.6, description: "This is product A" }, { price: 5.9, description: "This is product A" }, { price: 15.9, description: "This is product A" }, { price: 21.0, description: "This is product A" }, { price: 17.3, description: "This is product A" }, { price: 12.9, description: "This is product A" }]);
  const [mealDataWithPrice, setMealDataWithPrice] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert')
      .then(response => response.json())
      .then(data => {
        const dessertMealPromises = data.meals.slice(0, 10).map(meal =>
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

        fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef')
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

            fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Pasta')
              .then(response => response.json())
              .then(data => {
                const pastaMealPromises = data.meals.slice(0, 10).map(meal =>
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

                Promise.all([...dessertMealPromises, ...beefMealPromises, ...pastaMealPromises])
                  .then(data => {
                    setMealData(data);
                  })
                  .catch((error) => {
                    console.log('Error occurred while fetching meal data', error);
                  });
              })
              .catch((error) => {
                console.log('Error occurred while fetching Pasta data', error);
              });
          })
          .catch((error) => {
            console.log('Error occurred while fetching Beef data', error);
          });
      })
      .catch((error) => {
        console.log('Error occurred while fetching Dessert data', error);
      });
  }, []);

  useEffect(() => {
    // Combine mealData and mealPrice into a new array of objects
    const newData = mealData.map((data, index) => ({ ...data, ...mealPrice[index] }));
    setMealDataWithPrice(newData);
    setFilteredData(newData)
  }, [mealData, mealPrice]);
  console.log(filteredData)

  function handleFilterChange({ name, minPrice, maxPrice }) {
    let newData = [...mealDataWithPrice];

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
    setFilteredData(mealDataWithPrice);
  }

  return (
    <div className="wrapper">
      <div className="desc">
        <h1>Welcome!</h1>
        <p>Welcome to our online ordering website! We are thrilled to offer you a hassle-free and convenient way to order your favorite meals from the comfort of your home or office. Our menu features a wide range of delicious options, including pasta, beef, and dessert. Whether you're in the mood for a classic steak or a cheesy pasta, we have something for everyone. Our food is always fresh, prepared with high-quality ingredients, and served quickly to ensure that you can enjoy your meal without any delay. So go ahead and browse our menu, customize your order, and get ready to indulge in a tasty and satisfying meal!</p>
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

export default Home;