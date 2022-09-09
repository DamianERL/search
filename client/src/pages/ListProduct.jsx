import React from 'react'
import Navbar from '../components/navbar/Navbar'
import css from '../styles/list.module.css'
import Rupiah from 'rupiah-format'

import {  useQuery, } from 'react-query'
import { API } from '../config/api'
import { Link  } from 'react-router-dom'


export default function ListProduct() {
  let { data: products,refetch } = useQuery('productsCache1', async () => {
    const response = await API.get('/products');
    return response.data.data;
  });

  let handleDelete = async (id) => {
    await API.delete("/product/" + id);
    refetch();
  };

console.log(products)
  return (
    <>
    <Navbar/>
    <section  className={css.container}>
      <div>
        <h1  className={css.text1}>List Product</h1>
      </div>
      <div>
        <table className={css.wrap}>
          <thead>
          <tr>
            <th className={css.td}>No</th>
            <th className={css.td}>Image</th>
            <th className={css.td}>Name</th>
            <th className={css.td}>Stock</th>
            <th className={css.td}>Price</th>
            <th className={css.td}>Description</th>
            <th className={css.td}>Action</th>
          </tr>
          </thead>
          <tbody>
          {products?.map((item,index)=>(
            <tr>
              <td className={css.tr}>{index + 1}</td>
              <td className={css.tr}> <img  className={css.img} src={ "http://localhost:5000/uploads/" + item.image} alt="" /></td>
              <td className={css.tr}>{item.title}</td>
              <td className={css.tr}>{item.stock}</td>
              <td className={css.tr}>{Rupiah.convert(item.price)}</td>
              <td className={css.tr}>{item.desc}</td>
              <td className={css.action}>
              <button onClick={() => handleDelete(item.id)} className={css.btn}>Delete</button>
              <Link className={css.btnUpdate}
               to={ `/update-product/${item.id}`}>
              <button className={css.btn}> Update</button>
              </Link> 

              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </section>
    </>
  )
}
