import { Routes,Route, useNavigate} from 'react-router-dom'
//compenent 
import LandingPage from "./pages/LandingPage";
import Profile from './pages/Profile';
import DetailProduct from './pages/DetailProduct';
import Cart from './pages/Cart';
import UpdateProduct from './pages/UpdateProduct'
import Transaction from './pages/Transaction';
import AddProduct from './pages/AddProduct';
import ListProduct from './pages/ListProduct'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import './styles/index.css'
// import './styles/index.css'

// Init token on axios every time the app is refreshed
//
import {API,setAuthToken} from "./config/api"
import { useContext, useEffect } from "react";
import { UserContext } from './context/UserContext';



function App() {
  let navigate =useNavigate();

  if (localStorage.token) {
  setAuthToken(localStorage.token)
}

   // Init user context 
   const [state, dispatch] = useContext(UserContext);

   useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    // Redirect Auth
    if (state.isLogin === false) {
      navigate('/');
    } else {
      if (state.user.status === 'admin') {
        navigate('/transaction');
      } else if (state.user.status === 'customer') {
        navigate('/');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Routes>
      <Route  path="/" element={<LandingPage/>}/>
      <Route  path="/profile" element={<Profile/>}/>
      <Route  path="/detail-product/:id" element={<DetailProduct/>}/>
      <Route  path="/cart" element={<Cart/>}/>
      <Route  path="/transaction" element={<Transaction/>}/>
      <Route  path="/list-product" element={<ListProduct/>}/>
      <Route  path="/add-product" element={<AddProduct/>}/>
      <Route  path="/update-product/:id" element={<UpdateProduct/>}/>
    </Routes>
  );
}

export default App;
