import React from 'react'
import './product.scss'

const Product = ({el}) => {
  return (
    <div className='product'>

      <div className='product-img'> 
            <img src={el?.image.url}/>
        </div>
        <h3 className='product-name'>{el.name}</h3>
        <p className='product-price'>{el?.price.formatted}</p>
        
    </div>
  )
}

export default Product