import React, { useContext,useState, useEffect } from 'react';
import UserContext from '../context/user-context';
import axios from 'axios';

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);

    const context = useContext(UserContext);

    useEffect(() => {
        console.log("hi")
        console.log(context.loginUser)
        axios
          .get('http://localhost:3000/api/orderedMeals/', {params:{username: context.loginUser}})
          .then((response) => {
            //setCartItems(response.data);
            console.log("HI")
            console.log(response.data)
            context.changeCartItems(response.data)
            //console.log(response.data);
            //console.log(context.cartItems)
          })
          .catch((error) => {
            console.log(error);
          });
    }, []);

    const calculateTotalPrice = () => {
      let totalPrice = 0;
      for (let i = 0; i < context.cartItems.length; i++) {
        totalPrice += context.cartItems[i].price * context.cartItems[i].quantity;
      }
      return totalPrice.toFixed(2);
    };

    return(
        <div>
            <h1>Your Shopping Cart</h1>
            {/* {context.cartItems.map((item, index) => (
                
                <p key= {index}>{item.mealName} Quantity: {item.quantity}</p>
                
            ))}
            <h1>cartItems[0].mealName</h1> */}
            <table>
              <thead>
                <tr>
                  <th>Meal Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {context.cartItems.map((meal) => (
                  <tr key={meal.mealId}>
                    <td>{meal.mealName}</td>
                    <td>{meal.quantity}</td>
                    <td>{meal.price}</td>
                    <td>
                      {/* <button onClick={() => handleRemoveMeal(meal.id)}>Remove</button>
                      <button onClick={() => handleIncrementMeal(meal.id)}>+</button>
                      <button
                        onClick={() =>
                          meal.quantity > 1
                            ? handleDecrementMeal(meal.id)
                            : handleRemoveMeal(meal.id)
                        }
                      >
                        -
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2">Total Price:</td>
                  <td colSpan="2">${calculateTotalPrice()}</td>
                </tr>
              </tfoot>
            </table>
        </div>
    )


}

export default ShoppingCart;