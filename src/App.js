import React, { useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// commerce api
import { commerce } from './API/commerce-api';
// pages
import Home from "./pages/Homepage/Home";
import NavProducts from './pages/Nav-Products/NavProducts';
import Login from './pages/Login/Login';
import SignUp from './pages/Sign-up/SignUp';
import CheckMail from './pages/CheckMail/CheckMail';
import ProductDetails from './pages/Product-Details/Product-details';
import BasketEmpty from './pages/Basket-empty/Basket-empty';
import BasketProducts from './pages/Basket-product/Basket-products';
import MyProfile from './pages/My-Profile/MyProfile';
import ConfirmUser  from './/pages/Confirm-user/ConfirmUser';
// layouts
import Layout from './pages/Layout';
import RequireAuth from './pages/RequireAuth';
import AuthMiddleware from './pages/AuthMiddleware';

// auth
import {setLoginStatus} from './redux/reducer/authReducer'
import {getCustomer} from './redux/action/auth'

function App() {
  const auth= useSelector((state) => state.auth.islogin) // true/false
  const dispatch = useDispatch()
  const customerId= localStorage.getItem("commercejs_customer_id")
  
  // check auth
  useEffect(() => {
    dispatch(setLoginStatus(commerce.customer.isLoggedIn()))
    // localStorage.setItem("isLogin", commerce.customer.isLoggedIn())
  },[dispatch])

    // get customer info
    useEffect(() => {
      if(customerId){
        dispatch(getCustomer(customerId))
      }
    },[])


  return (
    <div>
      <Routes>
        {/* public pages */}
        <Route element={<Layout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path='/products/:id' element={<NavProducts/>}/>
          <Route path='/check-mail' element={<CheckMail/>}/>
          <Route path='/product-details/:id' element={<ProductDetails/>}/>
          <Route path='/basket-empty' element={<BasketEmpty/>}/>
          <Route path='/basket-products' element={<BasketProducts/>}/>
          <Route path='/confirm-user/:token' element={<ConfirmUser/>}/>
        </Route>

        {/* private pages */}
        <Route element={<RequireAuth auth={auth}/>}>
          <Route path='/my-profile' element={<MyProfile/>}/>
        </Route>

        {/* login */}
        <Route element={<AuthMiddleware auth={auth} />}>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
