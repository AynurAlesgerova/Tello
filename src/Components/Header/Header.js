import React, { useState ,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
// scss
import './header.scss'
import './menu.scss'
//icons
import logo from './icons/logo.png'
import search from './icons/search.png'
import account from './icons/person.png'
import shoppingCart from './icons/shopping-cart.png'
// commerce api
import {getFilteredProduct, getAllCategories} from '../../API/commerce-api'




const Header = () => {
  const [searchProducts, setSearchProducts]= useState([])
  const [categories, setCategories] = useState()
  const [onFocus, setOnFocus]= useState(false)
  const [onFocusMobile,setOnFocusMobile]= useState(false)
  const [input, setInput] = useState('')
  const [count, setCount] = useState(1)
  const [finished, setFinished]= useState(false)
  const navigate= useNavigate()

  // menu
  const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
  const [menu_class, setMenuClass] = useState("menu hidden")
  const [isMenuClicked, setIsMenuClicked] = useState(false)

  // redux
  const basketProducts = useSelector((state) => state.basketProducts.cartLength)
  const auth= useSelector((state) => state.auth.islogin)

  // debouncing
  const [history,setHistory] = useState(localStorage.getItem("history") ? JSON.parse(localStorage.getItem("history")) : [])


  useEffect(() => {
    const getData= setTimeout(() => {
      if (input.length > 0) {
        getFilteredProduct(input)
          .then((a) => (setSearchProducts(a?.data), setCount(a?.data?.length), setFinished(true)))
          history.push(input)
          localStorage.setItem("history", JSON.stringify(history.filter((e,i) => history.indexOf(e) === i)))
      }
    }, 2000);
   
    return () => clearTimeout(getData)

  }, [input])
  
  useEffect(() => {
    if (input.length===0) {
      setFinished(false)
      setInput("")
      setSearchProducts([])
      setOnFocus(false)
    }
  },[input])
  
  useEffect(() => {
    getAllCategories().then((data) => setCategories(data.data))
  },[])

  function handleAccount(){
    if(auth){
      navigate("/my-profile")
    }
    else{
      navigate("/signup")
    }
  }
  function handleBasket(){
     if(basketProducts>0){
      navigate("/basket-products")
      }
      else{
        navigate("/basket-empty")
        }
  }
  function goHomePage(){
    navigate("/")
  }

  
  const updateMenu = () => {
    if(!isMenuClicked) {
        setBurgerClass("burger-bar clicked")
        setMenuClass("menu visible")
    }
    else {
        setBurgerClass("burger-bar unclicked")
        setMenuClass("menu hidden")
    }
    setIsMenuClicked(!isMenuClicked)
}

  return (
    <div className='header'>
        <div className='container'>
          <div className='header-wrapper'>
            <div className='header-block'>

              <div className='menu-hamburger' style={{width: '5px', height: '8vh'}}>
                  <nav>
                      <div className="burger-menu" onClick={updateMenu}>
                          <div className={burger_class} ></div>
                          <div className={burger_class} ></div>
                          <div className={burger_class} ></div>
                      </div>
                  </nav>

                  <div   className={menu_class}>
                    <div className='logo-mobile'>
                        <img src={logo}></img>
                        <h2 className='logo-h2-mobile'>Tello</h2>
                    </div>
                    <img className='search-icon' src={search}/>
                    <div style={{paddingTop:'110px', paddingLeft:"40px"}}>
                      {
                        categories?.map((el) =>(
                          <Link to={`/products/${el.slug.charAt(0).toUpperCase()+el.slug.slice(1)}`}>
                            <div onClick={updateMenu} key={uuidv4()} className='categories' >{el.slug.charAt(0).toUpperCase()+el.slug.slice(1)}</div>
                          </Link>
                        ))
                      }
                    </div>
                  </div>
              </div>
              <div className='logo-block' onClick={goHomePage} >
                <img src={logo}></img>
                <h2 className='logo-h2'>Tello</h2>
              </div>
              <div className='search-block' >
                <div className='search-block-form'>
                    <img src={search}></img>
                    <form className='form' >
                      <input value={input}  onMouseDown={() => {setOnFocus(prev => !prev)}} onChange={(e) => setInput(e.target.value)}  className='form-input' placeholder='Axtarış...'/>
                    </form>
                </div>
              </div>
              <div className='user-block'>
                  <img onClick={handleAccount} className='account' src={account}/>
                  <img onClick={handleBasket} className='shoppingCart' src={shoppingCart}/>
                  <div className='countBasketItems'>
                    <span>{basketProducts}</span>
                  </div>
              </div>
            </div>

            <nav className='nav-header'>
                {
                  categories?.map((el) =>(
                    <Link to={`/products/${el.slug.charAt(0).toUpperCase()+el.slug.slice(1)}`}>
                      <div key={uuidv4()} className='categories' >{el.slug.charAt(0).toUpperCase()+el.slug.slice(1)}</div>
                    </Link>
                    
                  ))
                }
            </nav>
            {
              onFocus &&
                <div className='filterSearch'>
                  <div className='filterSearch-title'>
                    <p >Nəticələr</p>
                    <button onClick={() => (localStorage.removeItem("history"), setHistory(prev => []))}>Təmizlə</button>
                  </div>
                  <div className='history-block'>
                    {
                      history?.length > 0  && 

                      history?.map((el,i) => {
                        if (i===history.length-1  || i===history.length-2 || i===history.length-3  || i===history.length-4 ) {
                          return <div  key={uuidv4()} onClick={() => setInput(el)} className='search-history'>{el}</div>
                        }
                        })
                    }
                  </div>
                  {
                    input.length > 0 &&
                      searchProducts?.map((el) => (
                          <Link to={`/product-details/${el.id}`}>
                            <div onClick={() => setInput("")} className='searchProduct' key={uuidv4()}> 
                                <img className='img' src={el.image.url}></img>
                                <div key={uuidv4()} className='info'>
                                  <p>{el.name}</p>
                                  <p style={{marginTop:"12px"}}>{el.price.formatted_with_code}</p>
                                </div>
                            </div>
                          </Link>
                      ))
                  }
                  {
                     finished && (count===0 || count===undefined) &&
                    <p style={{marginTop:"20px"}}> Məhsul tapılmadı</p>
                  }
                  {
                    finished && searchProducts?.length!==0 && count>0 &&
                    <p>{count} məhsul</p>
                  }
                </div>
            }
           
            {/* mobile search */}
            <div className='md-search-block' >
                <div className='md-search-block-form'>
                    <img src={search}></img>
                    <form className='form' >
                      <input value={input} onMouseDown={() => {setOnFocusMobile(prev=> !prev)}} onChange={(e) => setInput(e.target.value)}  className='form-input' placeholder='Axtarış...'/>
                    </form>
                </div>

                {
                  onFocusMobile &&
                    <div className='filterSearch-mobile'>
                      <div className='filterSearch-title-mobile'>
                        <span>Son axtarışlar</span>
                        <button onClick={() => (localStorage.removeItem("history"), setHistory(prev => []))}><span style={{color:"#8F9BB3"}}>Təmizlə</span></button>
                      </div>
                      <div style={{display:"flex", alignItems:"center"}}>
                        {
                          history?.length > 0  && 

                          history?.map((el,i) => {
                            if (i===history.length-1  || i===history.length-2 || i===history.length-3  || i===history.length-4 ) {
                              return <div key={uuidv4()} onClick={() => setInput(el)} className='search-history'>{el}</div>
                            }
                            })
                        }
                      </div>
                      {
                        input.length > 0 &&
                          searchProducts?.map((el) => (
                              <Link to={`/product-details/${el.id}`}>
                                <div onClick={() => setInput("")} className='searchProduct-mobile' style={{display:"flex", alignItems:"center"}} key={uuidv4()}> 
                                    <img className='mobile-img' style={{width:"90px", height:"90px", marginRight:"40px"}} src={el.image.url}></img>
                                    <div className='mobile-info'>
                                      <p>{el.name}</p>
                                      <p>{el.price.formatted_with_code}</p>
                                    </div>
                                </div>
                              </Link>
                          ))
                      }
                      
                      {
                        finished && (count===0 || count===undefined) &&
                        <p style={{marginTop:"20px"}}> Məhsul tapılmadı</p>
                      }
                      {
                        finished && searchProducts?.length!==0 && count>0 &&
                        <p>{count} məhsul</p>
                      }
                    </div>
                }
            </div>
          </div>  
          </div>
    </div>
  )
}

export default Header