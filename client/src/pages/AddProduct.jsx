import React from 'react'
import Navbar from '../components/navbar/Navbar'
import css from '../styles/addPro.module.css'

import { useMutation } from "react-query";
import { useState } from "react";
import { API } from '../config/api';
import { useNavigate } from 'react-router-dom';


export default function AddProduct() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [nameUrl, setNameUrl] = useState();
  const [addProduct, setAddProduct] = useState({
    title: "",
    price: "",
    image: "",
    desc: "",
    stock: "",
  });

  // const { title, price, image, desc, qty } = addProduct;

  const handleChange = (e) => {
    setAddProduct({
      ...addProduct,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      setNameUrl(e.target.name[0]);
    }
  };
  console.log(addProduct);

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("image", addProduct.image[0], addProduct.image[0].name);
      formData.set("title", addProduct.title);
      formData.set("price", addProduct.price);
      formData.set("stock", addProduct.stock);
      formData.set("desc", addProduct.desc);

      console.log(formData);
      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Insert product data
      const response =await API.post("/product", formData, config);
      console.log(response);
      alert("berhasil menambahkan product");
      await delay(500);
      // regClose();
      navigate("/list-product");
    } catch (error) {
      console.log(error);
    }
  });  return (
    <>
    <Navbar/>
    <section className={css.container}>
      <div className={css.wrap}>
        <form onSubmit={(e) => handleSubmit.mutate(e)}>

      <h1 className={css.text21}>Add Product</h1>
        <input
        onChange={handleChange}
        className={css.input1}
        name="title"
        placeholder='name'
         type="text" />
        <input
        className={css.input1}
        placeholder='Stock'
        name="stock"
         onChange={handleChange}
         type="number" />
        <input
        className={css.input1}
        placeholder='Price'
        name="price"
        onChange={handleChange}
        type="number" />
        <textarea
        className={css.input2}
        placeholder='Description Product'
        onChange={handleChange}
        name="desc"
        type="text" />
        <input 
        name="image"
         onChange={handleChange}
        type="file" hidden id='addproduct'/>
        <label
        htmlFor="addproduct"
        // classname={css.input5}
        className={css.input1}
        > <p>
        {preview === "" ? "Photo Product" : preview}
        </p>
          <img src="https://res.cloudinary.com/doqkbrvkq/image/upload/v1661974422/Vector_u2xsdc.svg" alt="" />
        </label>
        <button className={css.btn}>Add Product</button>
        </form>
        </div>

      {preview && (
          <div className={css.wrap2}>
            <img className={css.img} src={preview} alt="preview" />
          </div>
        )}
    </section>
    </>
  )
}
