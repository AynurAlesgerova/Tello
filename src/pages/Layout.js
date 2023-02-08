import React from 'react'
import { Outlet } from 'react-router'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'

const Layout = () => {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout