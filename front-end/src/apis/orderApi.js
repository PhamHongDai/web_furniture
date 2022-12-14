import axios from "./axios";

const OrderApi = {
  addOrder: (order) => {
    const url = "/order/add"; 
    return axios.post(url, order);
  },
  getOrdersByUser: () => {
    const url = "/order/getOrdersByUser";
    return axios.post(url);
  },
  getAllOrders: () => {
    const url = "/order/getAllOrders";
    return axios.post(url);
  },
  updateStatus: (status) => {
    const url = "/order/updateStatus";
    return axios.post(url, status);
  },
};

export default OrderApi;
