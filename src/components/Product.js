import React from 'react';
import { NavLink } from 'react-router-dom';

const Product = (props) => {
  return (
    <NavLink to={`/ProductDetails/${props.id}`}
      state={{
        idCategory: props.idCategory,
        description: props.desc,
        mealImage: props.image,
        mealName: props.title,
        price: props.price,
        mealIngredients: props.ingredients,
        mealId: props.id
      }
      }>

      <div className='wrapperForProduct'>
        <label className="label"><img src={props.image} className="label_image" alt='meal'></img></label>
        <div className='wrapperForProductDesc' style={{ whiteSpace: "normal" }}>
          <ul style={{ listStyleType: "none", textIndent: "-2.5rem" }}>
            <li>{props.title}</li>
            <li>Price: {props.price}</li>
          </ul>
        </div>
      </div>
    </NavLink>
  )
}

export default Product;