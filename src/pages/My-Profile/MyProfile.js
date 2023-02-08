import React, { useEffect, useState } from 'react'
import { useDispatch , useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

// icons
import shoppingCart from './icons/shopping-cart.png'
import favorities from './icons/favorities.png'
import logout from './icons/logout.png'
import location from './icons/icon-location.png'
import account from './icons/icon-account.png'
import edit from './icons/edit.png'
import {commerce} from '../../API/commerce-api'

// scss
import './myProfile.scss'

// auth
import { getCustomer , updateCustomer} from '../../redux/action/auth'
import {setLoginStatus} from '../../redux/reducer/authReducer'

const MyProfile = () => {
  // redux
  const userData = useSelector((state) => state.auth.userData)
  const dispatch= useDispatch()
  const customerId= localStorage.getItem("commercejs_customer_id")
  const basketProducts = useSelector((state) => state.basketProducts.cartLength)
  const navigate = useNavigate()
  const [data, setData] = useState(userData)
  // console.log(data);
  // console.log(userData);


  // get customer info
  useEffect(() => {
    if(customerId){
      dispatch(getCustomer(customerId))
    }
  },[data,customerId, dispatch])
  

  // logOut
  function logoutUser(){
    commerce.customer.logout()
    localStorage.setItem("isLogin", false)
    navigate("/login")
    dispatch(setLoginStatus(false))
  }

  // update customer info
  function updateHandler(e){
    e.preventDefault()
    if (userData) {
      dispatch(updateCustomer(data))
      localStorage.setItem("commercejs_customer_id", data.id)
    }
  }
  
  return (
    <div className='my-profile'>
        <div className='profile-actions'>
            <ul className='list'>
              {
                basketProducts===0 &&
              <Link to={"/basket-empty"}>
                <li className='list-item'> <img className='icon' src={shoppingCart}/> <span>Sifarişlərim</span></li>
              </Link>
              }
              {
                basketProducts>0 &&
              <Link to={"/basket-products"}>
                <li className='list-item'> <img className='icon' src={shoppingCart}/> <span>Sifarişlərim</span></li>
              </Link>
              }
              <li className='list-item'> <img className='icon'  src={favorities}/> <span>Favorilərim</span></li>
              <li className='list-item'> <img className='icon'  src={account}/> <span style={{color : "#2DD06E"}}>Şəxsi məlumatlar</span></li>
              <li className='list-item'> <img className='icon'  src={location}/> <span>Çatdırılma ünvanı</span></li>
              <li className='list-item' onClick={logoutUser}> <img  className='icon' style={{cursor: "pointer"}} src={logout}/> <span>Çıxış</span></li>
            </ul>
        </div>

        <div className='user-information'>
          <form onSubmit={updateHandler}>
            <h2 style={{marginBottom:"20px"}}>Şəxsi məlumatlar</h2>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative  w-full mb-6 ">
                  <label className="  text-s  mb-2" htmlFor="grid-first-name">Ad</label>
                  <input defaultValue={userData?.firstname} onChange={e => {setData({ ...data, firstname: e.target.value })}} className=" block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight  focus:bg-white"  type="text" placeholder="Ad"/>
              </div>
              <div className="relative  w-full mb-6 ">
                  <label className="block  text-s  mb-2" htmlFor="grid-last-name">Soyad</label>
                  <input defaultValue={userData?.lastname}  onChange={e => {setData({ ...data, lastname: e.target.value })}} className=" block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="Soyad"/>
              </div>
            </div>

            <div className="grid md:grid-cols-2 sm:grid-cols-1 md:gap-6">
              <div className="relative  w-full mb-6 ">
                  <label className="block  text-s  mb-2" htmlFor="grid-first-name">E-mail</label>
                  <input defaultValue={userData?.email}  onChange={e => {setData({ ...data, email: e.target.value })}} className="block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="E-mail"/>
              </div>
              <div className="relative  w-full mb-6 ">
                  <label className="block  text-s mb-2" htmlFor="grid-last-name">Mobil nömrə</label>
                  <input defaultValue={userData?.phone}   onChange={e => {setData({ ...data, phone: e.target.value })}} className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Mobil nömrə"/>
              </div>
            </div>
            <div className="relative  w-full mb-12 ">
              <button className='edit-button'><img src={edit}/>Məlumatları yenilə</button>
            </div>
          </form>
        </div>

    </div>
  )
}

export default MyProfile