import React, {useState} from 'react'
import './slickSlider.scss'
import img from './slider-phone.png'
import background from './background.png'
import phone from './img for background.png'

import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

////////////////////////////////////////////////////////////
import 'swiper/swiper.scss';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/swiper.min.css';
import  { Virtual, Controller } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
SwiperCore.use([Virtual]);
SwiperCore.use([Controller]);

const SlickSlider = () => {

    const slides = [
        {
          url: `${background}`,
        },
        {
            url: `${background}`,
        }
      ];
    
      const [currentIndex, setCurrentIndex] = useState(0);
    
      const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
      };
    
      const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
      };
    
      const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
      };
  

    
  return (
        <>
          <div className='max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group slideDesktop'>
          <div
              style={{ backgroundImage: `url(${slides[currentIndex].url})` , position:"relative"}}
              className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
          >
              <img style={{position:"absolute", bottom:"230px", right:"140px"}} src={img}/>
              <p style={{position:"absolute", top:"250px", left:"140px", width:'40%', fontSize:"x-large"}}>Buy & Sell What's Now & Next</p>
              <p style={{position:"absolute", top:"290px", left:"140px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.  </p>
          </div>
          {/* Left Arrow */}
          <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
              <BsChevronCompactLeft onClick={prevSlide} size={30} />
          </div>
          {/* Right Arrow */}
          <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
              <BsChevronCompactRight onClick={nextSlide} size={30} />
          </div>
          <div className='flex top-4 justify-center py-2'>
              {slides.map((slide, slideIndex) => (
              <div
                  key={slideIndex}
                  onClick={() => goToSlide(slideIndex)}
                  className='text-2xl cursor-pointer'
              >
                  <RxDotFilled />
              </div>
              ))}
          </div>
          </div>



          <div className="slider">
              <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                <SwiperSlide>
                  <div className='bbbbbbb' style={{ backgroundImage: `url(${background})`}}>
                  <img style={{height:"100px", width:"100px"}} src={img}/>
                  <p className='text1'>Buy & Sell What's Now & Next</p>
                  <p  className='text2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='bbbbbbb'>
                  <img style={{height:"120px", width:"100px"}} src={phone}/>
                  <p className='text1'>Buy Iphone 12</p>
                  <p className='text2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide >
                  <div className='bbbbbbb'>
                  <img style={{height:"100px", width:"100px"}} src={img}/>
                  <p className='text1'>Buy & Sell What's Now & Next</p>
                  <p className='text2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='bbbbbbb'>
                  <img style={{height:"120px", width:"100px"}} src={phone}/>
                  <p className='text1'>Buy Iphone 12</p>
                  <p className='text2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                  </div>
                </SwiperSlide>
              </Swiper>
          </div>

        </>
  )

  
}

export default SlickSlider