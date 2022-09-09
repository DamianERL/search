import React, { useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import css from '../styles/addPro.module.css'
import { API } from '../config/api';
import { useMutation, useQuery } from 'react-query';
import {  useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function AddProduct() {
  let navigate = useNavigate();
  const params = useParams();
  const [preview, setPreview] = useState(null);
  const [previewName, setPreviewName] = useState("");
  const [product, setProduct] = useState({}); //Store product data
  const [form, setForm] = useState({
    image:"",
    title:"",
    price:"",
    stock:"",
    desc:"",
  })
  let { data: products } = useQuery('productCache', async () => {
    const response = await API.get('/product/' + params.id);
    return response.data.data;
  });

  useEffect(() => {
    if (products) {
      setPreview(products.image);
      // setPreviewName(products.image.slice(30));
      setForm({
        ...form,
        title: products.title,
        desc: products.desc,
        price: products.price,
        stock: products.stock,
      });
      setProduct(products);
    }
  }, [products]);

  //   handlechange
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      setPreviewName(e.target.files[0].name);
      //check
    }
  };
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      }
      formData.set("title", form.title);
      formData.set("price", form.price);
      formData.set("stock", form.stock);
      formData.set("desc", form.desc);

      // Insert category data
      await API.patch("/product/" + product.id, formData, config);

      navigate("/list-product");
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <>
    <Navbar/>
    <section className={css.container}>
      <div className={css.wrap}>
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
      <h1 className={css.text21}>Update Product</h1>
        <input
        onChange={handleChange}
        className={css.input1}
        name="title"
        placeholder='name'
        value={form?.title}
         type="text" />
        <input
        className={css.input1}
        placeholder='Stock'
        name="stock"
        value={form?.stock}
         onChange={handleChange}
         type="number" />
        <input
        className={css.input1}
        placeholder='Price'
        name="price"
        value={form?.price}
        onChange={handleChange}
        type="number" />
        <textarea
        className={css.input2}
        placeholder='Description Product'
        onChange={handleChange}
        name="desc"
        value={form?.desc}
        type="text"
         />
        <input
        name="image"
        // value={form?.image}
         onChange={handleChange}
        type="file"  
        id='form' hidden 
        />
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
