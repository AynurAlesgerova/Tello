import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
// scss
import './navProducts.scss'

// commerce js
import { getAllProductsByCategory ,getAllProductsByQuery } from '../../API/commerce-api';

//icons
import icon from  './icons/right-icon.png'
import aznBlack from './icons/azn-black.png'
import filterIcon from './icons/filter-icon.png'

// pagination
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const NavProducts = () => {
    const [allproducts, setAllProducts]= useState()
    const [loading, setLoading]= useState(true)
    const [count, setCount]= useState()
    const [clickFilter, setClickFilter]= useState(false)
    const [sortClick, setSortClick]= useState(false)
    const [searchParams, setSearchParams] = useSearchParams({sortBy: "created_at"});
    const [filter, setFilter] = useState(searchParams.get(['filter'])?.split(",") || [])
    const [page,setPage]=useState(1)
    const [meta,setMeta]=useState(null)
    const sort = searchParams.get('sortBy')
    const id= useParams().id
    const categories=["Samsung","Apple","Huawei", "Xiaomi"]

    useEffect(() => {
        if (filter.length===0) {
            setLoading(true)
            getAllProductsByCategory(id, sort, page)
                .then((a) => 
                    (setAllProducts(a.data), setLoading(false), setCount(a.data.length), setMeta(a.meta))
                )
        }
    } ,[id, sort, page])
    
    useEffect(() =>{
        if(filter.length!==0){
            setLoading(true)
            getAllProductsByQuery(filter.toString(), sort,page, id)
            .then((a) => 
            (setAllProducts(a?.data), setCount(a?.data.length), setMeta(a?.meta), setLoading(false))
            )
        }
    },[filter, sort, searchParams,id, page])

    useEffect(()=> {
        if(!searchParams.get('filter')){
            searchParams.delete("filter")
            searchParams.set('sortBy', 'created_by')
            setSearchParams(searchParams)
            setFilter([])
        }
    },[id])

    function handleCheck(e){
        let res;
        if(e.target.checked && !filter.includes(e.target.value)){
            res= [...filter,e.target.value]
        }else{
            res=filter.filter((a) => (a !== e.target.value))
        }
        searchParams.set('filter', res)
        setSearchParams(searchParams)
        setFilter(res)

    }
    function handleChange(e, value){
        setPage(value)
    }
    
    return (
    <div className='container' >

        <div >  
                {/* kecidler */}
                <div className='product-category'>
                    <span>Ana səhifə</span>
                    <img src={icon}/>
                    <span>{id.charAt(0).toUpperCase() + id.slice(1)}</span>
                </div>


                <div className='product-list-wrapper'>
                    <div className='filter'>
                            <div className='filteredItem'>
                                <span>Brend</span>
                            </div> 
                            
                            <div className='choices'>
                                {
                                    categories.map((el) => {
                                        return <div key={uuidv4()} class="flex items-center mb-4"  onClick={handleCheck}>
                                                    <input defaultChecked={filter.includes(el) || id===el} id="default-checkbox" type="checkbox" value={el} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                    <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{el}</label>
                                                </div>
                                    })

                                
                                }
                            </div>
                    </div>

                    {/* mobile siralama- filterlemeler */}
                    <div >
                        <div className='md-mobile-filtered'>
                            <div className='md-filter' onClick={() => setSortClick(true)} >
                                <img src={filterIcon}/>
                                { !sortClick ?
                                    <span>Sıralama</span> :
                                    <select value={sort} onChange={(e=>  {
                                        searchParams.set("sortBy", e.target.value)
                                        setSearchParams(searchParams)
                                    })} className="selectedFor">
                                        <option value="created_at">Ən yenilər</option>
                                        <option value="name">Ada görə</option>
                                        <option  value="price">Qiymətə görə</option>
                                    </select>
                                }
                                
                            </div>

                            <div className='md-filter' onClick={()  =>  setClickFilter(prev => !prev)} >
                                <img src={filterIcon}/>
                                <span>Filterləmələr</span>
                            </div>

                        </div>

                        {/* mobile  brend-choices */}
                        <div className='filter-wrapper'>
                                { clickFilter &&
                                    <>
                                        <div className='filteredItem'>
                                            <span>Brend</span>
                                        </div> 
                                
                                        <div className='choices'>
                                        {
                                            categories.map((el) => {
                                            return  <div key={uuidv4()} class="flex items-center mb-4"  onClick={handleCheck}>
                                                        <input defaultChecked={filter.includes(el) || (id.charAt(0).toUpperCase() + id.slice(1))===el} id="default-checkbox" type="checkbox" value={el} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                        <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{el}</label>
                                                    </div>
                                            })
                                        }
                                        </div>
                                    </>
                                }
                        </div>
                    
                    </div>
                    

                    <div className='product-list' style={loading? {paddingBottom:"500px"} : {}}>
                        <div className='product-sort'>
                            <div className='total-product'>{ count? <span>{count} məhsul tapıldı</span> : "Məhsul axtarılır..."}</div>
                            <div className='mobile-filter-sort'>
                                <select onChange={(e=> setSearchParams({sortBy: `${e.target.value}`}))} className="selectedFor">
                                    <option value="created_at">Ən yenilər</option>
                                    <option value="name">Ada görə</option>
                                    <option  value="price">Qiymətə görə</option>
                                </select>
                            </div>
                        </div>

                    {
                        !loading? 
                        <div>
                            <div className='products-wrapper'>
                            <div className='products'>
                                {
                                    allproducts?.map((el,) =>(
                                        <Link to={`/product-details/${el?.id}`}>
                                            <div key={uuidv4()} props={id} className='product'>
                                                <div className='product-img'> 
                                                    <img src={el?.image.url}/>
                                                </div>
                                                <h3 className='product-name'>{el.name}</h3>
                                                <p className='product-price'>{el?.price.formatted}<img src={aznBlack}/></p>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                            </div>

                            <div className='pagination-wrapper'>
                                { !loading &&
                                <Stack>
                                    <Pagination count={meta?.pagination?.total_pages} page={page} onChange={handleChange}> </Pagination>
                                </Stack>
                                }
                            </div>
                        </div>

                        :
                        <div className='navProducts-loading'>
                            <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>                
                        </div>
                    }

                    </div>
                </div>

        </div>
       
       
    </div>
  )
}

export default NavProducts


































    
