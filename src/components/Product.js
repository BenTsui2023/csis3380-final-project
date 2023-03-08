import React from 'react';

const Product = (props) => {
    return(
      <div className='wrapperForProduct'>
        {/* <div className='wrapperForProductImage'> */}
          <label className="label"><img src={props.image} className="label_image"></img></label>
        {/* </div> */}
        <div className='wrapperForProductDesc'>
          <ul style={{listStyleType: "none"}}>
            <li>{props.title}</li>
            <li>{props.price}</li>
          </ul>
        </div>
      </div>
    )
  }

  export default Product;