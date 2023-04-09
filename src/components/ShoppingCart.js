import React, { useContext,useState, useEffect } from 'react';
import UserContext from '../context/user-context';
import axios from 'axios';

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);

    const context = useContext(UserContext);
    //const [currentUser, setCurrentUser] = useState(context.loginUser);

    // useEffect(() => {
    //     setCurrentUser(context.loginUser);
    // }, [context.loginUser]);

    // useEffect(() => {
    //     console.log("hi")
    //     console.log(context.loginUser)
    //     axios
    //       .get('http://localhost:3000/api/orderedMeals/', {params:{username: context.loginUser}})
    //       .then((response) => {
    //         context.changeCartItems(response.data);
    //         console.log(response.data);
    //         console.log(context.cartItems)
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   }, []);
    useEffect(() => {
        console.log("hi")
        console.log(context.loginUser)
        axios
          .get('http://localhost:3000/api/orderedMeals/', {params:{username: context.loginUser}})
          .then((response) => {
            setCartItems(response.data);
            context.changeCartItems(response.data)
            //console.log(response.data);
            console.log(context.cartItems)
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

    return(
        <div>
            <h1>Your Shopping Cart</h1>
            {cartItems.map((item, index) => (
                
                <p key= {index}>{item.mealName} Quantity: {item.quantity}</p>
                
            ))}
            <h1>cartItems[0].mealName</h1>
        </div>
    )


}

export default ShoppingCart;