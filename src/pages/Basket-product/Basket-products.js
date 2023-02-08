import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
// redux

//icons
import deleteIcon from './icons/delete.png'
import plus from './icons/plus.png'
import minus from './icons/minus.png'
import icon from './icons/azn-black.png'

//scss
import './Basket-products.scss'

// commerce api
import { getProductFromBasket, removeFromCart, updateCart,createCart } from '../../API/commerce-api'

// redux
import {setCartLength} from '../../redux/reducer/basketReducer'

const BasketProducts = () => {
    const [products, setProducts]= useState([])
    const [loading, setLoading]= useState(true)
    const [count,setCount] =useState(1)
    const [totalPrice,setTotalPrice] =useState(0)

    const dispatch= useDispatch()
    const navigate= useNavigate()

  // create cart
    useEffect(()=> {
        createCart()
            .then((p) => (localStorage.setItem("cart_id", p?.id)))
    },[])

    // get product from cart
    useEffect(() => {
        getProductFromBasket()
            .then((p) => 
            (setProducts(p.line_items),
            setTotalPrice(p.subtotal.raw),
            setLoading(false), 
            // setCount(p.length),
            setCount(p.total_items),
            dispatch(setCartLength(p.total_unique_items))
            )
        )
    },[])
    useEffect(() => {
        if (count===0) {
            navigate("/basket-empty")
        }
    })

    function deleteProduct(id){
        setLoading(true)
        removeFromCart(id)
        .then((p) => (setProducts(p.line_items), setLoading(false),setTotalPrice(p.subtotal.raw), dispatch(setCartLength(p.total_unique_items)), setCount(p.total_items)))
    }

    function updateClick(id, quantity){
        setLoading(true)
        updateCart(id,quantity)
        .then((p) => (setProducts(p.line_items),setTotalPrice(p.subtotal.raw), setLoading(false), setCount(p.total_items)))
    }

  return (
    
    <div>
        <div className='basket-body' style={ loading ? {padding: "320px 0 320px 0"} : {}}>
            {
                !loading  &&
                    <div className='container'>
                        <div className='basket-title'>
                            <span> Səbət ({count} məhsul)</span>
                        </div>
                        <div className='basket-wrapper'>
                            <div className='basket-items'>
                                {
                                    products?.map((el) => (
                                            <div key={uuidv4()} className='basket-item'>
                                                <Link to={`/product-details/${el.product_id}`}>
                                                    <div className='product-img'>
                                                        <img style={{width:"70px"}} src={el.image.url}/>
                                                    </div>
                                                </Link>
                                                
                                                <div className='info'>
                                                    <div className='name'>{el.name}</div>
                                                    <div className='color-price-info'>
                                                        <span className='color'>Rəng:</span>
                                                        <span className='price'> {el.price.formatted}  <img className='icon' src={icon}/></span>
                                                    </div>                      
                                                </div>

                                                <div className='count'>
                                                    <div onClick={()=>el.quantity>1 &&  updateClick( el.id, +(el.quantity-1))} className='div-icon'>
                                                        <img  src={minus}/>
                                                    </div>
                                                    <p>{el.quantity}</p>
                                                    <div onClick={() => updateClick(el.id, +(el.quantity+1))} className='div-icon'>
                                                        <img  src={plus}/>
                                                    </div>
                                                </div>
                                                <div className='deleteBtn'>
                                                    <img onClick={() => deleteProduct(el.id)} src={deleteIcon}/>
                                                </div>

                                            </div>
                                        
                                    ))
                                }
                            </div>
                            <div className='basket-total'>
                                <h1>Ümumi</h1>
                                <ul style={{marginBottom: "20px"}}>
                                    <li className='total-list-item'>
                                        <span>Məbləğ</span>
                                        <span className='list-item-price'> {totalPrice}<img className='icon' src={icon}/></span>
                                    </li>
                                    <li className='total-list-item'>
                                        <span>Çatdırılma</span>
                                        <span className='list-item-price'>0<img  className='icon' src={icon}/></span>
                                    </li>
                                    <li className='total-list-item'>
                                        <span>Hədiyyə paketi</span>
                                        <span className='list-item-price'>0<img className='icon' src={icon}/></span>
                                    </li>
                                    <li className='total-list-item'>
                                        <span>Promo kod</span>
                                        <span className='list-item-price'>00.00 <img className='icon' src={icon}/></span>
                                    </li>
                                </ul>
                                <hr></hr>
                                <ul>
                                <li className='total-list-item'>
                                        <span>Cəmi</span>
                                        <span className='list-item-price'> {totalPrice}<img className='icon' src={icon}/></span>
                                    </li>
                                </ul>
                            </div>
                            
                        </div>
                    </div>
            }
            
            {
                loading ?   
                <div className='loading'>
                    <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>                
                </div> 
                :   ""
            }
        </div>
    </div>
    
  )
}

export default BasketProducts