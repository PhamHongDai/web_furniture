import { Routes, Route } from "react-router-dom";
import Home from "../pages/Clients/Home";
import Shop from "../pages/Clients/Shop";
import ProductDetail from "../pages/Clients/ProductDetail";
import Cart from "../pages/Clients/Cart";
import Checkout from "../pages/Clients/Checkout";
import Login from "../pages/Clients/Login";
import Signup from "../pages/Clients/Signup";
import Profile from "../pages/Clients/Profile";
import Delivery from "../pages/Clients/Delivery";
import Purchase from "../pages/Clients/Purchase";
import Password from "../pages/Clients/Password";
import Products from "../pages/Admin/Products";
import ProtectedRoute, { ProtectedCheckout, ProtectedUrl } from "./ProtectedRoute";
import HomeAdmin from "../pages/Admin/HomeAdmin";
import { useSelector } from "react-redux";
import Catagories from "../pages/Admin/Catagories";
import Orders from "../pages/Admin/Orders";
import Users from "../pages/Admin/Users";

const Routers = () => {
  const { user } = useSelector((state) => state.auth);
    return (
      <Routes>
        <Route element ={<ProtectedRoute/>}>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/delivery' element={<Delivery/>}/>
          <Route path='/purchase' element={<Purchase/>}/>
          <Route path='/password' element={<Password/>}/>
          <Route element={<ProtectedCheckout/>}>
            <Route path='/checkout' element={<Checkout/>}/>
          </Route>
        </Route>
        <Route path='/' element={user.role === "admin" ? <HomeAdmin/> : <Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/catagories' element={<Catagories/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/shop/:slug' element={<ProductDetail/>}/>
        <Route path='/signin' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route element ={<ProtectedUrl/>}>
          <Route path="*" element={<Home/>}/>
        </Route>
      </Routes>
    );
  }
  
export default Routers;
  