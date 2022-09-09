import React from 'react'
import Rupiah from 'rupiah-format'
import Navbar from '../components/navbar/Navbar'
import data from '../dummy/transaction'
import css from '../styles/transaction.module.css'
export default function Transaction() {
  return (
    <>
    <Navbar/>
    <section  className={css.container}>
      <div>
        <h1  className={css.text1}>Income transaction</h1>
      </div>
      <div>
        <table className={css.wrap}>
          <thead>
          <tr>
            <th className={css.td}>No</th>
            <th className={css.td}>Name</th>
            <th className={css.td}>Address</th>
            <th className={css.td}>Post Code</th>
            <th className={css.td}>Products Order</th>
            <th className={css.td}>Status</th>
          </tr>
          </thead>
          <tbody>
          {data?.map((item,index)=>(
            <tr>
              <td className={css.tr}>{index + 1}</td>
              <td className={css.tr}>{item.name}</td>
              <td className={css.tr}>{item.address}</td>
              <td className={css.tr}>{item.postCode}</td>
              <td className={css.tr}>{Rupiah.convert(item.income)}</td>
              <td className={css.tr}>
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
