import React from 'react'
import Rupiah from "rupiah-format";
import {useNavigate, useParams} from 'react-router-dom'
// import products from '../dummy/product'
import Navbar from '../components/navbar/Navbar'
import { useQuery } from 'react-query';
import { API } from '../config/api';
import cssModules from '../styles/detail.module.css';
export default function DetailProduct() {
  let navigate =useNavigate()
  //filter
  const {id} = useParams();
  // const title = "Product";
  // console.log(params)
  // const id = products[parseInt(params.id-1)]
  let { data: product } = useQuery('productCache', async () => {
    const response = await API.get('/product/' + id);
    return response.data.data;
  });
  console.log(product)
  let price = product?.price
  // console.log(price)
  const handleclick = async (e)=>{
  try {
    const config={
      Headers:{
        "Content-type":"application/json"
      },
    }
    const body = JSON.stringify({
      product_id:parseInt(id),
      subtotal: price
    })
    const response = await API.post("/cart",body,config);
    console.log(response)
  } catch (error) {
    console.log(error)
  }

  }
  // console.log()
  return (
    <>
    <Navbar/>
    <section className={cssModules.container}>
      <div>
        <img  className={cssModules.imgp} src={"http://localhost:5000/uploads/" + product?.image} alt="ok" />
      </div>
        <div className={cssModules.wrap}>
        <p className={cssModules.title}>{product?.title}</p>
        <p className={cssModules.text}>Stock: {product?.stock}</p>
        <p className={cssModules.text}>{product?.desc}</p>
        <p className={cssModules.price}>{Rupiah.convert(product?.price)}</p>
        <button className={cssModules.btn} onClick={handleclick} >Add cart</button>
        </div>
    </section>
    </>
  )
}
