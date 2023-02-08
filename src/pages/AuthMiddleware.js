import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
const AuthMiddleware = ({auth}) => {
  return (
    <>
        {!auth ? 
        <>
            <Header/>
            <Outlet/>
            <Footer/>
            </>  : <Navigate to={"/"}/>}
        </>
  )
}

export default AuthMiddleware