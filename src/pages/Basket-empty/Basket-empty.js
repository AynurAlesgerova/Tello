import './basket-empty.scss'
import basket from './shopping-cartt.png'
import React from 'react'
import { useNavigate } from 'react-router'

const BasketEmpty = () => {
  const navigate= useNavigate()
  function continueShopping(){
    navigate("/")
  }
  return (
    <div className='basket'>

        <div className='basket-img'>
            <img src={basket}/>
        </div>
        <p>Səbətiniz halhazırda boşdur</p>
        <button onClick={continueShopping} className="basket-btn">Alış-verişə davam et</button>
    </div>
  )
}

export default BasketEmpty