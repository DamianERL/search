//dependencies
import React from 'react'
import Rupiah from "rupiah-format";
// import productD from '../dummy/product'
import { Link } from "react-router-dom";
import { useState,useContext } from 'react';
import { useQuery } from 'react-query';
import { API } from '../config/api';

//component
import {UserContext} from '../context/UserContext'
import Navbar from '../components/navbar/Navbar'
import cssModules from '../styles/landingPage.module.css'

//
import { FaSearch } from 'react-icons/fa';
export default function LandingPage() {
    //userdata
    const [state] = useContext(UserContext);

//modal login
const [show,setShow] =useState(false)
const handleClick = () => setShow(true)

// Fetching product data from database
let { data: products } = useQuery('productsCache', async () => {
    const response = await API.get('/products');
    return response.data.data;
  });
// console.log(products)
const [filter,setFilter]=useState("")
//
let searchText =(e)=>{
    setFilter(e.target.value)
}
console.warn(filter)
//
let dataFilter =products?.filter(item=>{
    return Object.keys(item).some(key=>
        item[key].toString().toLowerCase().includes(filter.toString().toLowerCase()))
})

  return (
    <>
    <Navbar setShow={setShow} show={show}/>
    <section>
        <div className={cssModules.heroSection}>
          <img  src="https://res.cloudinary.com/doqkbrvkq/image/upload/v1661841358/Jumbotron_js2fee.svg" alt="" />
        </div>
    </section>
    <section>
        <div className={state.user.status === "customer" ? "" : "d-none"}>
            <div className={cssModules.wrapFilter}>
                <p className={cssModules.filter1}>

                    <input
                        placeholder='search. . .'
                        // className='form-control'
                        className={cssModules.filter2}
                        onChange={searchText.bind(this)}
                        type="text"
                      
                        id='ok1'
                    />
                    <label className={cssModules.filter2} htmlFor="ok1">
                        <FaSearch className={cssModules.imgserch} /></label>
                </p>
            </div>
        </div>
        <div className={cssModules.product} >
            {dataFilter?.map((item,index) => (
                <div key={index} className={cssModules.card1}>
                   <div className={cssModules.cardProduct}>
                    <Link
                    to={ 
                        state.isLogin === true ? `/detail-product/${item.id}`:""
                    } onClick={state.isLogin === false ? handleClick:""}
                    >
                    <img className={cssModules.imageProduct} src={"http://localhost:5000/uploads/" + item.image} alt=""/>
                    </Link>
                    </div>
                    <div className={cssModules.wrapProduct}>
                    <p className={cssModules.titlep}>
                        {item?.title}</p>
                    <p className={cssModules.pricep}>
                        {Rupiah.convert(item?.price) }</p>
                    <p className={cssModules.stockp}>
                        {item?.stock}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
    </>
  )
}
