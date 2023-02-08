import React from 'react'
import AdvantageWrapper from "../../Components/Advantage-Wrapper/AdvantageWrapper";
import BannerWrapper from "../../Components/Banner-wrapper/BannerWrapper";
import Partners from "../../Components/Partners-Slider/PartnersSliderWrapper";
import Product_Slider from "../../Components/Product-Slider/Product_Slider";
import SlickSlider from "../../Components/Slick-Slider/SlickSlider";
import Categories from '../../Components/Category-card/Category-card-wrapper'

const Home = () => {

  return (
    <div>
        <SlickSlider/>
        <Product_Slider text={'Ən çox satılan məhsullar'} props={"bestsellers"}/>
        <Product_Slider text={'Ən yeni mobil telefonlar'} props={"mobil-telefonlar"}/>
        <BannerWrapper/>
        <Product_Slider text={'Ən yeni aksesuarlar'} props={"aksesuarlar"} />
        <Categories/>
        <AdvantageWrapper/>
        <Partners/>
    </div>
  )
}

export default Home