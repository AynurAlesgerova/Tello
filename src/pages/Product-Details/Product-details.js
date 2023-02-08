import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
//  icons
import icon from  './icons/right-icon.png'
import minus from './icons/minus.png'
import plus from './icons/plus.png'
import basketIcon from './icons/basket.png'
import left from './icons/left-icon.png'
import right from './icons/rightt-icon.png'

// scss
import './productDetails.scss'

// commerce js
import { getProduct , addProductToCart} from '../../API/commerce-api';

// redux
import {setCartLength} from '../../redux/reducer/basketReducer'

// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper.scss';
// import 'swiper/components/navigation/navigation.scss';
// import 'swiper/components/pagination/pagination.scss';
// import 'swiper/components/scrollbar/scrollbar.scss';
// import  { Navigation} from 'swiper';
// import SwiperCore, { Thumbs} from 'swiper/core';
// SwiperCore.use([Navigation, Thumbs]);


const ProductDetails = () => {
    // const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [product, setProduct]= useState()
    const [currentImage, setCurrentImage]=useState("")
    const [loading, setLoading]= useState(true)
    const [count, setCount]= useState(1)
    const phoneId= useParams().id
    let urls=[]
    //redux
    const dispatch = useDispatch()

    useEffect(() => {
        setLoading(true)
        getProduct(phoneId)
            .then((p) => (setProduct(p), setLoading(false)))
    } ,[phoneId])


    function prevImage(){
        product?.assets.map(e => {
            urls.push(e.url)
        })
        const index= urls.indexOf(currentImage)
        if(index===0){
            setCurrentImage(urls[urls.length-1])
        }
        else{
        setCurrentImage(urls[index-1])
        }
    }
    function nextImage(){
        product?.assets.map(e => {
            urls.push(e.url)
        })
        const index= urls.indexOf(currentImage)
        if(index=== urls.length-1){
            setCurrentImage(urls[0])
        }
        else{
            setCurrentImage(urls[index+1])
        }
    }     
    function decrease(){
        if (count>0) {
            setCount(prev => (prev-1))
        }
    }
    function increase(){
        setCount(prev => (prev+1))
    }
    function addToBasket(){
        addProductToCart(product?.id, count)
        .then(res=>{
            
            dispatch(setCartLength(res.total_unique_items))
        })
    }

    
 
  return (
    <div className='product-details-content' style={loading ? {padding: "320px 0 320px 0"} : {}}>
        {
            !loading  &&
            <div className='product-category'>
                <span>Ana səhifə</span>
                <img src={icon}/>
                <span>{product?.name.charAt(0).toUpperCase() + product?.name.slice(1)}</span> 
            </div>
        }
        
        {
            !loading  &&
            <div className='product-details-wrapper'>
            <div className='product-images-wrapper'>
                <div className='current-image'>
                    <div className='icon'  onClick={prevImage} >
                        <img src={left}/>
                    </div>
                    <div className='img'>
                        {
                            currentImage ?  <img   src={currentImage}/> : <img   src={product?.image.url}/>
                        }
                    </div>
                    <div className='icon' onClick={nextImage}>
                        <img  src={right}/>
                    </div>
                </div>
                <div  className='other-images'>
                    {
                        product?.assets.map((img,i) => (
                                 <div  key={uuidv4()} className='img' style={{cursor:"pointer"}} onClick={() => setCurrentImage(img.url)}>
                                        <img   src={img.url}  />
                                </div>
                        ))
                    }
                </div>

                {/* <>
                <Swiper
                    style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                    }}
                    loop={true}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[ Navigation, Thumbs]}
                    className="mySwiper2"
                >
                    {
                        product?.assets?.map((img) => (
                            // <div  key={uuidv4()}  style={{cursor:"pointer", width:"30px"}} >
                                   <SwiperSlide>< img key={uuidv4()} src={img.url} style={{cursor:"pointer", width:"150px", height:"150px"}}/></SwiperSlide>
                        //    </div>
                   ))
                    }
                    
                </Swiper>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={4}
                    watchSlidesProgress={true}
                    modules={[ Navigation, Thumbs]}
                    className="mySwiper"
                >
                   {
                        product?.assets?.map((img) => (
                            // <div  key={uuidv4()} style={{cursor:"pointer"}} >
                                   <SwiperSlide><img key={uuidv4()} style={{cursor:"pointer"}} src={img.url} /></SwiperSlide>
                        //    </div>
                   ))
                    }
                    
                </Swiper>
                </> */}
      


            </div>
            <div className='product-information'>
                <h3>{product?.name}</h3>
                <p className='price'>{product?.price.formatted_with_code}</p>
                <div className='product-variants'> 
                    {
                        product?.variant_groups.map((el)=> {
                            if(el.name === 'color'){
                                return (
                                <div key={uuidv4()} className='colors' >
                                    <p>Rəng:</p>
                                    {
                                            el.options?.map((a) => {
                                                return <div key={uuidv4()}  className='color'>{a.name} </div>
                                        })
                                    }
                                </div>

                                )
                            }
                        })
                    }
                    
                    { 
                    product?.variant_groups.map((el)=> {
                        if(el.name === 'memory' && el.options.length>0){
                            return (
                                <div key={uuidv4()} className='memory-choices'>
                                    <p>Yaddaş:</p>
                                    { el.options?.map((a) => {
                                                return <div key={uuidv4()}  className='memory'>{a.name} </div>
                                        })}
                                </div>

                            )
                        }
                    })
                    }
                   
                    
                    <div className='count'>
                        <p className='count-title'>Miqdar:</p>
                        <div onClick={decrease} className='div-icon'>
                            <img  src={minus}/>
                        </div>
                        <p>{count}</p>
                        <div onClick={increase} className='div-icon'>
                            <img  src={plus}/>
                        </div>
                    </div>
                    <button onClick={addToBasket} className='add-to-basket'> <img src={basketIcon}/> Səbətə at </button>
                </div>
            </div>

            </div>
       
        }

        {
            loading &&   
            <div className='loading'>
                <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>                
            </div> 
                    
        }



        
    </div>
  )
}

export default ProductDetails