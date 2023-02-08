import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'

const RequireAuth = () => {
  const auth= useSelector((state) => state.auth.islogin)
  return (
    <>
        {auth ? <>
            <Header/>
            <Outlet/>
            <Footer/>
            </> : <Navigate to={"/login"}/>}
        </>
  )
}

export default RequireAuth