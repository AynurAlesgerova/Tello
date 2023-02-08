import React from 'react'
import './partnersWrapper.scss'
import toshiba from './icons/toshiba.png'
import philips from './icons/philips.png'
import hp from './icons/hp.png'
import bosch from './icons/bosch.png'
import gorenje from './icons/gorenje.png'
import electrolux from './icons/electrolux2.png'


const PartnersSliderWrapper = () => {
  return (
    <div className='partners-wrapper'>
        <div className='container'>
            <div className='partners-block'>
                <div className='img'><img  src={toshiba}/></div>
                <div className='img'><img  src={philips}/></div>
                <div className='img'><img  src={hp}/></div>
                <div className='img'><img  src={bosch}/></div>
                <div className='img'><img  src={gorenje}/></div>
                <div className='img'><img  src={electrolux}/></div>
            </div>
        </div>
    </div>
  )
}

export default PartnersSliderWrapper