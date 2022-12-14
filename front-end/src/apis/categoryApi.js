import axios from "./axios";

const categoryApi = {
    getCategories: () => {
        const url = "/category/getCategories";
        return axios.get(url);
    },
    addCategories: (category) => {
      const url = "/category/add";
      return axios.post(url, category)
    },
    updateCategories: (category) => {
      const url = "/category/update";
      return axios.post(url, category)
    },
    setDisableCategories: (id) => {
      const url = "/category/setDisable";
      return axios.post(url, id)
    },
    getCategoryDisabled: () => {
      const url = "/category/getCategoriesDisable";
      return axios.get(url);
    },
};

export default categoryApi;
