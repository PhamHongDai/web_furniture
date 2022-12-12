import Layout from "./components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "./slices/productSlice";
import { getCartItems } from "./slices/cartSlice";
import { getAllOrders, getOrdersByUser } from "./slices/orderSlice";
import { getUserAddress } from "./slices/addressSlice";
import { isUserLoggedIn } from "./slices/authSlice";
import { getCategories } from "./slices/categorySlice";
import { getUsers } from "./slices/userSlice";

function App() {
  const { isAuthenticated, user } = useSelector((state) =>  state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts()).unwrap();
    dispatch(getCategories()).unwrap();
    if (user.role === 'admin') {
      const checkAdmin = () => {
        dispatch(getAllOrders());
        dispatch(getUsers());
      }
      checkAdmin();
    }
    if (isAuthenticated) {
      const fetchData = () => {
        dispatch(getCartItems());
        dispatch(getUserAddress());
        dispatch(getOrdersByUser());
      };
      fetchData();
    }
    else {
      const checkUser = () => {
        dispatch(isUserLoggedIn());
      };
      checkUser();
    }
  }, [isAuthenticated]);
  return (
    <Layout/>
  );
}

export default App;
