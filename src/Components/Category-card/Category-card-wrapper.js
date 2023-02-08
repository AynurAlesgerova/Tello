import React from 'react'
import './categoryWrapper.scss'
import icon from './chevron-right.png'
import phone from './card-phone.png'
import clock from './saat.png'
import accessuar from './accessuar.png'
import { Link } from 'react-router-dom'

const CategoryCardWrapper = () => {
  return (
    <div className='category-card-wrapper'>
        <div className='container'>
          <div className='categories-block'>
              <div className='category-card first'>
                  <h3 className='title'>Telefonlar</h3>
                  <Link to={"products/Mobil-telefonlar"}>
                  <div style={{display: "flex"}}>
                      <span>Məhsullara keçid</span>
                      <img src={icon}/>
                  </div>
                  </Link>
                  <img  className='first-img'  src={phone}/>
              </div>

              <div className='category-card second'>
                  <h3 className='title'>Smart Saatlar</h3>
                  <Link to={"products/Smart-saatlar"}>
                  <div style={{display: "flex"}}>
                      <span>Məhsullara keçid</span>
                      <img src={icon}/>
                  </div>
                  </Link>
                  <img  className='second-img'  src={clock}/>
              </div>

              <div  className='category-card third'>
                  <h3 className='title'>Aksesuarlar</h3>
                      <Link to={"products/Aksesuarlar"}>
                        <div  style={{display: "flex"}}>
                            <span>Məhsullara keçid</span>
                            <img src={icon}/>
                        </div>
                      </Link>
                  <img  className='third-img'  src={accessuar}/>
              </div>
          </div>
        </div>
    </div>
  )
}

export default CategoryCardWrapper