import React, { useContext,useState, useEffect } from 'react';
import { useLocation } from "react-router-dom"
import UserContext from '../context/user-context';
import axios from 'axios';

const ProductDetails = () => {
  const context = useContext(UserContext);
  const { state } = useLocation();
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState("");
  //const [currentUser, setCurrentUser] = useState(context.loginUser);

  // useEffect(() => {
  //   setCurrentUser(context.loginUser);
  // }, [context.loginUser]);

  const SubmitMeal = (e) => {
    e.preventDefault();
    if(quantity > 1 ){
    setMessage(`${quantity} nos of ${state.mealName} are added to your cart!`)
    }
    else if(quantity == 1){
      setMessage(`${quantity} no of ${state.mealName} is added to your cart!`)
      }
      //console.log(currentUser)
      axios.post("http://localhost:3000/api/orderedMeals/add", { 
        mealName: state.mealName, 
        quantity,
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

  

  const QuantityChange = (e) => {
    setQuantity(e.target.value);
  }

  return (
    <div className='wrapperForProductDetails'>
      <label className="label"><img src={state.mealImage} className="label_image" alt='meal'></img></label>
      <div className='wrapperForProductDetailsDesc'>
        <ul style={{ listStyleType: "none", textIndent: "-2.5rem" }}>
          <li>{state.mealName}</li>
          <li>{state.description}</li>
          <li>Price: {state.price}</li>
        </ul>
        <p>Ingredients used</p>
        <ol>
        {state.mealIngredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
        </ol>
        <form onSubmit={SubmitMeal}>
          <label>
            Quantity:{' '}
            <input type="number" min="1" max="10" value={quantity} onChange={QuantityChange} />
          </label>
          <button type="submit">Add to cart</button>
        </form>
        {message.length > 0 && <p> {message} </p>}
      </div>
    </div>
  )
}

export default ProductDetails;