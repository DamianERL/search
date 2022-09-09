import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import cssModules from "../../styles/nav.module.css"
import { UserContext } from "../../context/UserContext"
import ModalAuth from '../modal/ModalAuth'
import DropDown from './dropdown/DropDown'

export default function Navbar({counter,show,setShow}) {
    const [state] =useContext(UserContext);
    const isLogin = state.isLogin;

    //

    //
  return (
    <>
    <nav className={cssModules.container}>
        <div>
            <Link to={state.user.status ==="admin"?"/transaction":"/"}>
            <img src='https://res.cloudinary.com/doqkbrvkq/image/upload/v1661842683/Icon_nxtk0f.svg' alt="" />
            </Link>
        </div>
        {isLogin ? (    
                <div className="navbarRight">
                   
                <div
                    className={
                        counter === undefined
                        ? "d-none"
                        : counter === 0
                        ? "d-none"
                        : "circle"
                    }
                    >
                    {counter}
                    </div>
                    
                    <div className='d-flex align-items-center me-3'>
                        <Link to={"/cart"} className='me-3'>
                        <img
                            src='https://res.cloudinary.com/doqkbrvkq/image/upload/v1661974422/shopping-basket_1_1_bkipga.svg'
                            alt="cart"
                            className={
                            state.user.status === "customer" ? "navbarCart" : "d-none"
                            }
                        />
                        </Link>
                        <DropDown />
                    </div>
                </div>
            ) : (
                <div className='navbarAuth'>
                <ModalAuth show={show} setShow={setShow} />
                </div>
            )}
        
    </nav>
    </>
  )
}


