import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { UserContext } from '../../context/UserContext';
import {  Modal } from 'react-bootstrap'
import { useMutation } from "react-query";
import { API } from "../../config/api";
import css from '../../styles/modalAuth.module.css';
// import { useNavigate } from 'react-router-dom';

export default function ModalAuth({ show,setShow}) {
  // modal check
  // const navigate = useNavigate();
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [shows, setShows] = useState(false);
  const handleShows = () => setShows(true);
  const handleCloses = () => setShows(false);
  const handleSwitchRegister = () => {
    setShow(false);
    setShows(true);
};
const handleSwitchLogin = () => {
  setShows(false);
  setShow(true);
};
//login
const [state,dispatch] =useContext(UserContext);
const [form,setForm] = useState({
  email:'',
  password:'',
});
console.log(form)
const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};
const handleSubmit = useMutation(async (e) => {
  try {
    e.preventDefault();

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const body = JSON.stringify(form);

    const response = await API.post("/login", body, config);

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: response.data.data,
      });
      setShow(false);
      // navigate("/")
  } catch (error) {
    console.log(error);
  }
});
const [register, setRegister] = useState({
  email: "",
  password: "",
  name: "",
});
// console.log(register)
const handleChangeRegister = (e) => {
  setRegister({
    ...register,
    [e.target.name]: e.target.value,
  });
};


const handleSubmitRegister = useMutation(async (e) => {
  e.preventDefault();

  // Configuration Content-type
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // Data body
  const body = JSON.stringify(register);

  // Insert data user to database
  await API.post("/register", body, config);

  // Handling response here
  setShows(false);
});

  return (
    <>
      <>
        {/* login */}
        <button className={css.btnLG} onClick={handleShow}>LOGIN</button>
        <Modal show={show} onHide={handleClose}>
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Modal.Header >
              <Modal.Title className={css.login1}>LOGIN</Modal.Title>
            </Modal.Header>
        
            <div className={css.form}>

            <input 
            className={css.input}
            type="email" 
            placeholder='Email'
            name="email"
            id='email'
            onChange={handleChange}
            />
            <input
            type="password"
            className={css.input}
            placeholder="password"
            name="password"
            id="password"
            onChange={handleChange}
            />
            <button type='submit' className={css.btndown}> LOGIN</button>
            </ div>

          <Modal.Footer>
            
            <p className={css.onclick1}>Don't have an account ? click <strong onClick={handleSwitchRegister}>Here</strong></p>
          </Modal.Footer>
        </form>
      </Modal>
      </>
      <>
      <button className={css.btnRG} onClick={handleShows}>REGISTER</button>
      <Modal show={shows} onHide={handleCloses}>
          <form onSubmit={(e) => handleSubmitRegister.mutate(e)} >
            <Modal.Header >
              <Modal.Title className={css.login1}>REGISTER</Modal.Title>
            </Modal.Header>
        
            <div className={css.form}>

              <input
              type="text"
              className={css.input}
              placeholder="Name"
              name="name"
              id="name"
              onChange={handleChangeRegister}
              />
            <input 
            className={css.input}
            type="email" 
            placeholder='Email'
            name="email"
            id='email'
            onChange={handleChangeRegister}
            />
            <input
            type="password"
            className={css.input}
            placeholder="password"
            name="password"
            id="password"
            onChange={handleChangeRegister}
            />
            <button type='submit' className={css.btndown}> Register</button>
            </ div>

          <Modal.Footer>
            <p className={css.onclick1}>Already have an account ? click Here <strong onClick={handleSwitchLogin}>Here</strong></p>
          </Modal.Footer>
        </form>
      </Modal>
      </>
    </>
  )
}
