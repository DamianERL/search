import React, { useContext } from 'react'
import Navbar from '../components/navbar/Navbar'
import cssModules from '../styles/profile.module.css'
import QRCode from "react-qr-code";
import { UserContext } from '../context/UserContext';
import { useQuery } from 'react-query';
import { API } from '../config/api';

export default function Profile() {
  const title = "Profile";
  document.title = "WaysBeans | " + title;
  const   [state]=useContext(UserContext)
  console.log('====================================');
  console.log(state);
  console.log('====================================');
  let { data: transactions } = useQuery("transactionsCache", async () => {
    const response = await API.get("/user-transaction");
    return response.data.data;
  });
console.log(transactions)
  return (
    <>
    <Navbar/>
    <section className={cssModules.container}>
      {/* <section className={cssModules.Profile}> */}
      <div>  
          <h1 className={cssModules.text3}>My Profile</h1>
        <div  className={cssModules.ProfileLeft}> 
          <img className={cssModules.imgp} src="https://res.cloudinary.com/doqkbrvkq/image/upload/v1661856699/taejune-kim-cafe_m6gndm.jpg" alt="" />
          <ul>
            <li className={cssModules.text1}>FULL NAME</li>
            <li className={cssModules.text2}>{state.user.name}</li>
            <li className={cssModules.text1}>Email</li>
            <li className={cssModules.text2}>{state.user.email}</li>
          </ul>
        </div>
      </div>
      {/* </section> */}
      <section cssModules={cssModules.wrap11}>
        <h1 className={cssModules.text10}>My Transaction</h1>
        <div className={cssModules.wrapproduct}>
        <div  className={cssModules.ProfileRight}>
          <img  className={cssModules.img1} src="https://res.cloudinary.com/doqkbrvkq/image/upload/v1661841360/Rectangle_4_jaaqe7.png" alt='' />
          <ul className={cssModules.wrap21}>
            <li className={cssModules.text4}>Guetemala beans</li>
            <li className={cssModules.text5}><strong className={cssModules.text6}>saturday</strong>  , 5 macrch 2002</li>
            <li className={cssModules.text7}>price:2.000.000</li>
            <li className={cssModules.text7}>qty:2</li>
            <li  className={cssModules.text8} >sub total 601.800</li>
          </ul>
        </div>
        <div className={cssModules.qrRight}>
          <img className={cssModules.imgtt} src="https://res.cloudinary.com/doqkbrvkq/image/upload/v1661937184/Frame_g45ro2.svg" alt="" />
          <QRCode className={cssModules.qr} value="ok" bgColor="transparent" size={80} />
          <span className={cssModules.bgt9}>
            <p className={cssModules.text9}>waiting aprrove</p>
          </span>
        </div>
      </div>
        </section>
    </section>
    </>
  )
}
