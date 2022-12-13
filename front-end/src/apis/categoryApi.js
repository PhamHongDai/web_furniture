import axios from "./axios";

const categoryApi = {
    getCategories: () => {
        const url = "/category/getCategories";
        return axios.get(url);
    },
    addCategories: (category) => {
      const url = "/category/add";
      return axios.post(url, category)
    }
};

export default categoryApi;
