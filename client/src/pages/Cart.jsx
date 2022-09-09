import React, { useEffect } from 'react'
import css from '../styles/cart.module.css'
import Navbar from '../components/navbar//Navbar'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import { API } from '../config/api'
import Rupiah from 'rupiah-format'

export default function Cart() {
  let navigate =useNavigate()
//
let {data:cart,refetch} = useQuery("cartsCache",async()=>{
  const response =await API.get("carts-id");
  return response.data.data
})
console.log(cart)
// total
let resultTotal = cart?.reduce((x,y)=>{
  console.log(y)
  return x+y.qty * y.subtotal;
},0)


//qty
let resultQTY = cart?.reduce((a,b)=>{
  return a + b.qty
},0)
//remove
let handleDelete = async (id)=>{
  await API.delete('/cart/'+id)
  refetch();
}
//update
const increasesCart = async (idProduct)=>{
  try {
    const result =cart.find(({id})=>id ===idProduct);

    const config={
      header:{
        "Content-type":"application/json"
      },  
    }

    const body =JSON.stringify({
      qty:result.qty +1
    });
    await API.patch("/cart/"+idProduct,body,config);
    refetch();
  } catch (error) {
    console.log(error)
  }
}

const decreaseCart = async (idProduct)=>{
  try {
    const result =cart.find(({id})=>id ===idProduct);

    const config={
      header:{
        "Content-type":"application/json"
      },
    }

    const body =JSON.stringify({
      qty:result.qty -1
    });
    await API.patch("/cart/"+idProduct,body,config);
    refetch();
  } catch (error) {
    console.log(error)
  }
}


  // pay midtrans
  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    // const myMidtransClientKey = "Client key here ...";
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  // handlebuy

  const form = {
    total: resultTotal,
  };
  const handleSubmit = useMutation(async (e) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const body = JSON.stringify(form);
    const response = await API.post("/transaction", body, config);
    const token = response.data.data.token;

    window.snap.pay(token, {
      onSuccess: function (result) {
        console.log(result);
        navigate("/profile");
      },
      onPending: function (result) {
        console.log(result);
        navigate("/profile");
      },
      onError: function (result) {
        console.log(result);
      },
      onClose: function () {
        alert("you closed the popup without finishing the payment");
      },
    });
    await API.patch("/cart", body, config);
  });
// let image = cart?.product?.Image
// console.log(image)
  return (
    <>
    <Navbar/>
    <container className={css.container}>
      <h1 className={css.text1}>My Cart</h1>
        <h1  className={css.text2}>Review Your Order</h1>
        <div  className={css.bigwrap}>
          <section  className={css.wrap1}>
          {cart?.map((item,index)=>(
            <div className={css.mid} key={index}>
              <div className={css.left}>

                <img className={css.imgproduct} src={"http://localhost:5000/uploads/" +item?.product?.Image} alt="" />
                <ul className={css.wraptext}>
                  <li  className={css.text3}>{item?.product.Title}</li>
                  <li> 
                  <strong onClick={()=>decreaseCart(item?.id)} className={css.text5}>-</strong>
                  <strong className={css.text4}>{resultQTY}x  </strong>
                  <strong  onClick={()=>increasesCart(item?.id)} className={css.text5}>+</strong>
                  </li>
                </ul>
              </div>
              <div className={css.rightorder}>
                <p className={css.text6}>{Rupiah.convert(item?.product?.Price)}</p>
                <img on onClick={()=>handleDelete(item?.id)} src="https://res.cloudinary.com/doqkbrvkq/image/upload/v1661974422/Group_adcp9g.svg" alt="" />
              </div>
            </div>
          ))}
          </section>
      <section className={css.wrap2}>
        <div className={css.right}>
          <div className={css.leftpay}>
            <p className={css.text6}>sub total</p>
            <p className={css.text6}>qty</p>
          </div>
          <div className={css.rightpay1}>
            <p className={css.text6}>{Rupiah.convert(resultTotal)}</p>
            <p className={css.text6}>{resultQTY}</p>
          </div>
        </div>
        <div className={css.rightpay}>
          <p className={css.text7}>
          Total
          </p>
          <p className={css.text8}>
            {Rupiah.convert(resultTotal)}
          </p>
          
        </div>
          <button className={css.btn12} onClick={(e)=>handleSubmit.mutate(e)}>Pay</button>
      </section>
        </div>
    </container>
    </>
  )
}
