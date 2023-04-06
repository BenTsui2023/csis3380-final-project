import React from 'react';
import { useLocation} from "react-router-dom"

const ProductDetails = () => {
    const { state } = useLocation();
    return(
      <div className='wrapperForProduct'>
          <label className="label"><img src={state.mealImage} className="label_image" alt='meal'></img></label>
        <div className='wrapperForProductDesc'>
            <ul style={{listStyleType: "none"}}>
                <li>{state.mealName}</li>
                <li>{state.description}</li>
                <li>Price: {state.price}</li>
            </ul>
            <p>Ingredients used</p>
            {state.mealIngredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          
        </div>
      </div>
    )
  }

  export default ProductDetails;