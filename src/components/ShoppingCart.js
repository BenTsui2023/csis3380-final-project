import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../context/user-context';
import axios from 'axios';
import '../css/ShoppingCart.css';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);

  const context = useContext(UserContext);

  useEffect(() => {
    console.log("hi")
    console.log(context.loginUser)
    axios
      .get('http://localhost:3000/api/orderedMeals/', { params: { username: context.loginUserY } })
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

  const removeItem = (index) => {
    const newCartItems = [...context.cartItems];
    newCartItems.splice(index, 1);
    context.changeCartItems(newCartItems);

    axios.post("http://localhost:3000/api/orderedMeals/updateCart",
      {
        newCart: newCartItems
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
      });
  };

  const incrementQuantity = (index) => {
    const newCartItems = [...context.cartItems];
    newCartItems[index].quantity++;
    context.changeCartItems(newCartItems);

    axios.post("http://localhost:3000/api/orderedMeals/updateCart",
      {
        newCart: newCartItems
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
      });
  };

  const decrementQuantity = (index) => {
    const newCartItems = [...context.cartItems];
    if (newCartItems[index].quantity > 1) {
      newCartItems[index].quantity--;
      context.changeCartItems(newCartItems);
    }

    axios.post("http://localhost:3000/api/orderedMeals/updateCart",
      {
        newCart: newCartItems
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
      });
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (let i = 0; i < context.cartItems.length; i++) {
      totalPrice += context.cartItems[i].price * context.cartItems[i].quantity;
    }
    return totalPrice.toFixed(2);
  };

  return (
    <div className='wrapperForProductDetails'>
      <h1>Your Shopping Cart</h1>
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
          {context.cartItems.map((meal, index) => (
            <tr key={index}>
              <td>{meal.mealName}</td>
              <td>{meal.quantity}</td>
              <td>{meal.price}</td>
              <td>
                <button
                  onClick={() =>
                    meal.quantity > 1
                      ? decrementQuantity(index)
                      : removeItem(index)
                  }
                >
                  -
                </button>
                <button onClick={() => incrementQuantity(index)}>+</button>
                <button onClick={() => removeItem(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2" className='cartSummary'>Total Price:</td>
            <td colSpan="2" className='cartSummary'>${calculateTotalPrice()}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )


}

export default ShoppingCart;