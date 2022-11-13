import axios from "./axios"

const addressApi = {
  getAddress: () => {
    const url = "/deliveryInfo/get";
    return axios.get(url)
  },
  addAddress: (address) => {
    const url = "/deliveryInfo/add";
    return axios.post(url, address)
  },
  deleteAddress: (address) => {
    const url = "/deliveryInfo/delete";
    return axios.post(url, address)
  },
  setDefaultDeliveryInfo: (address) => {
    const url = "/deliveryInfo/setDefaultDeliveryInfo";
    return axios.post(url, address)
  }

}
    
export default addressApi
