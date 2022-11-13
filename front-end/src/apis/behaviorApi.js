import axios from "./axios";

const behaviorApi = {
  addBehavior: (payload) => {
    const url = "/recom/addBehavior";
    console.log(payload);
    return axios.post(url, payload);
  },
};
export default behaviorApi;
