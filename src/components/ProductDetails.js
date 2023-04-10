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
  
  //console.log(itemIndex) 
  // useEffect(() => {
  //   setCurrentUser(context.loginUser);
  // }, [context.loginUser]);
  
  // checkCart = (item) => { 
  //   const itemIndex = context.cartItems.findIndex( 
  //     (meal) => meal.mealId === item.id 
  //   );
  //   if (itemIndex === -1) { 
  //     context.changeCartItems([...context.cartItems[itemIndex], item]); 
  //   } else {  
  //     const newCart = [...context.cartItems];
  //     newCart[itemIndex].quantity += item.quantity; 
  //     context.changeCartItems({ newCart }); 
  //   } 
  // }; 

  const SubmitMeal = (e) => {
    e.preventDefault();
    setMessage(`Product: ${state.mealName} added to your cart!`)

    console.log(state.price)
    console.log(context.cartItems)

    const itemIndex = context.cartItems.findIndex( 
      (meal) => meal.mealId === state.mealId 
    );
    console.log(itemIndex)
    
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
      console.log(typeof quantity) 
      context.changeCartItems( newCart );
      console.log("new cart")
      console.log(context.cartItems)

      axios.post("http://localhost:3000/api/orderedMeals/addItem", {  
      quantity: context.cartItems[itemIndex].quantity ,
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
  const QuantityChange = (e) => {
    setQuantity(Number(e.target.value));
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
        <p>Ingredients Used</p>
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