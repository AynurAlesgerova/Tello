import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import icon from './chevron-right.png'
import './producSlider.scss'
import Product from './Product'
import { commerce } from '../../API/commerce-api'

const Product_Slider = ({props, text}) => {
    const [allproducts, setAllProducts]= useState()
    const [loading, setLoading]= useState(true)

    async function getAllProducts(){
      try {
        const Commerce= await commerce.products.list({
          category_slug: [`${props}`], 
          limit: 4
        }) 
        setAllProducts(Commerce.data)
        setLoading(false)
      } catch (error) {
        console.log(error.message);
      }
    }
  
    useEffect(() => {
      getAllProducts()
    } ,[])
  
  
  return (
    <div className='container'>
     
        <div className='products-slider_block' style={ loading ? {position : "relative", padding: "200px 0"} : {}}>
          {
            !loading  &&
            <div className='products-slider_title'>
                <div><span>{text}</span> </div>
                <div className='all'>
                    <Link to={`/products/${props}`}><span>Hamısına bax</span></Link>
                    <img src={icon}/>
                </div>
            </div>
          }
          {
            !loading  &&
            <div className='products'>
            {
                allproducts?.map((el,index) =>{
                  return <Link key={index} to={`/product-details/${el?.id}`}>
                          <Product el={el}/>
                    </Link>
                })
            }
            </div>
          }
          {
            loading &&   
            <div className='loading'>
                <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>                
            </div> 
                  
          }
        </div>
      

     
        
    </div>
  )
}

export default Product_Slider