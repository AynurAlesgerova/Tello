import './bannerWrapper.scss'
import React from 'react'
import phone from './phonee.png'

const BannerWrapper = () => {
  return (
    <div className='banner-wrapper'>
        <div className='banner-block'>
            <div className='info'>
                <span>Iphone 11. Əsl sizə lazım olan </span>
            </div>
            <div className='img'>
                <img src={phone}/>
            </div>
        </div>
        <div className='banner-block'>
            <div className='info'>
                <span>Iphone 11. Əsl sizə lazım olan </span>
            </div>
            <div className='img'>
                <img src={phone}/>
            </div>
        </div>
    </div>
  )
}

export default BannerWrapper