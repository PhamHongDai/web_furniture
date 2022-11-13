import Layout from "./components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "./slices/productSlice";
import { getCartItems } from "./slices/cartSlice";
import { getOrdersByUser } from "./slices/orderSlice";
import { getUserAddress } from "./slices/addressSlice";
import { isUserLoggedIn } from "./slices/authSlice";
import { getCategories } from "./slices/categorySlice";

function App() {
  const { isAuthenticated } = useSelector((state) =>  state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts()).unwrap();
    if (isAuthenticated) {
      const fetchData = () => {
        dispatch(getCartItems());
        dispatch(getCategories());
        dispatch(getUserAddress());
        dispatch(getOrdersByUser());
      };
      fetchData();
    } else {
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
