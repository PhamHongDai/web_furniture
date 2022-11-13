import axios from "./axios";

const categoryApi = {
    getCategories: () => {
        const url = "/category/getCategories";
        return axios.get(url);
    }
};

export default categoryApi;
