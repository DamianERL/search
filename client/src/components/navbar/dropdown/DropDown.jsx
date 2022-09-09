// depedencies
import { NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from "react";

//component
import css from '../../.././styles/drop.module.css'
import { UserContext } from "../../../context/UserContext";

export default function DropDown() {
        // logout
        const [state, dispatch] = useContext(UserContext);
        // const status = state.user.status;
        const navigate = useNavigate();
    
        const logout = () => {
            dispatch({
            type: "LOGOUT",
            });
            navigate("/");
        };

  return (
    <>
    <NavDropdown
    title={
    <img className={css.navimg} src="https://res.cloudinary.com/doqkbrvkq/image/upload/v1662209311/profil_fu7yot.png" alt="photoProfile"/>}
    
    >
        <div className={state.user.status === "customer" ? "" : "d-none"}>
            <Link to="/profile" className={css.navbarItem} >
                <img
                    src='https://res.cloudinary.com/doqkbrvkq/image/upload/v1662214040/user_2profile_saguo5.svg'
                    alt="profile"
                    className="d-flex dropdown-img me-2 ms-4"
                />
                <p className="d-flex mb-0  dropAdmin align-items-center ms-2" >Profile</p>
            </Link>
        </div>
        <div className={state.user.status === "admin" ? "mb-2 mt-2 ps-3 " : "d-none"}>
            <Link to="/add-product" className={css.navbarItem}>
            <img
                src='https://res.cloudinary.com/doqkbrvkq/image/upload/v1662214040/Groupad_lisprod_mtx3ca.svg'
                alt="ListProduct"
                className="d-flex dropdown-img ms-1"
            />
            <p className="d-flex mb-0 ps-3 dropAdmin">add Product</p>
            </Link>
        </div>
        
        <div className={state.user.status === "admin" ? "mb-2 mt-2 ps-3 " : "d-none"}>
            <Link to="/list-product" className={css.navbarItem}>
            <img
                src='https://res.cloudinary.com/doqkbrvkq/image/upload/v1662214040/Groupad_lisprod_mtx3ca.svg'
                alt="ListProduct"
                className="d-flex dropdown-img ms-1"
            />
            <p className="d-flex mb-0 ps-3 dropAdmin">List Product</p>
            </Link>
        </div>
        <hr className="mt-2 mb-2"/>
        <div className="d-flex" onClick={logout}>
            <img src='https://res.cloudinary.com/doqkbrvkq/image/upload/v1662214040/logout_1pintu_ikesvu.svg' alt="logout" className="d-flex dropdown-img me-2 ms-4" />
            <p className={css.navbarItem1}>Logout</p>
        </div>
    </NavDropdown>
    </>
  )
}
