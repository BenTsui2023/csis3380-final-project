import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from "react-router-dom"
import UserContext from '../context/user-context';
import axios from 'axios';
import '../css/ProductDetails.css';

const ProductDetails = () => {
  const context = useContext(UserContext);
  const { state } = useLocation();
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState("");

  const SubmitMeal = (e) => {
    if (context.loggedInSucceed == false) {
      e.preventDefault();
      setMessage("Please log in to add items to your cart.");
      return;
    }
    else {
      e.preventDefault();
      setMessage(`Product: ${state.mealName} added to your cart!`)

      const itemIndex = context.cartItems.findIndex(
        (meal) => meal.mealId === state.mealId
      );

      if (itemIndex === -1) {
        context.changeCartItems([...context.cartItems, { mealName: state.mealName, quantity: quantity, mealId: state.mealId, price: state.price }]);

        axios.post("http://localhost:3000/api/orderedMeals/addNewItem", {
          mealName: state.mealName,
          quantity,
          mealId: state.mealId,
          price: state.price
        },
          {
            headers: {
              "Authorization": `Bearer ${context.currentToken}`,
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
            setMessage(error.response.data.err);
          });
      }
      else {
        const newCart = [...context.cartItems];
        newCart[itemIndex].quantity = newCart[itemIndex].quantity + quantity; 
        context.changeCartItems(newCart);

        axios.post("http://localhost:3000/api/orderedMeals/addItem", {
          quantity: context.cartItems[itemIndex].quantity,
          mealId: state.mealId
        },
          {
            headers: {
              "Authorization": `Bearer ${context.currentToken}`,
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            console.log(response.data);

          })
          .catch((error) => {
            console.log(error);
            setMessage(error.response.data.err);
          });
      }

    }
  }
  const QuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  }

  return (
    <div className='wrapperForProductDetails'>
      <label className="label"><img src={state.mealImage} className="label_image" alt='meal'></img></label>
      <div className='wrapperForProductDetailsDesc'>
        <ul style={{ listStyleType: "none", textIndent: "-3rem" }}>
          <li id='mealName'>{state.mealName}</li>
          <li id='price'>Price: {state.price}</li>
          <li id='desc'>{state.description}</li>
        </ul>
        <div className='ingredients'>
          <p>Ingredients Used</p>
          <ol>
            {state.mealIngredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ol>
        </div>
        <form onSubmit={SubmitMeal}>
          <label>
            Quantity:{' '}
            <input type="number" min="1" max="10" value={quantity} onChange={QuantityChange} />
          </label>
          <button type="submit">Add to cart</button>
        </form>
        <div className='message'>
          {message.length > 0 && <p> {message} </p>}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails;