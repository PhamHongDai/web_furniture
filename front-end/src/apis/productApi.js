import axios from "./axios";

const productApi = {
    getProducts: () => {
        const url = "/product/getProducts";
        return axios.post(url);
    },
    getProductBySlug: (slug) => {
        const url = `/product/${slug}`;
        return axios.get(url);
    },
    getProductsByCategorySlug: (slug) => {
        const url = `/product/${slug}/category`;
        return axios.get(url);
    },
    addProductReview: (review) => {
        const url = "/product/addProductReview";
        return axios.post(url, review);
    },
    deleteProductById: (productId) => {
        const url = "/product/deleteProductById";
        return axios.post(url, productId)
    },
    updateProduct: (product) => {
        const url = "/product/update";
        return axios.post(url, product)
    },
    addProduct: (product) => {
        const url = "/product/add";
        return axios.post(url, product)
    },
    searchByProductName: (text) => {
        const url = "/product/searchByProductName";
        return axios.post(url, {text})
    },
};

export default productApi;
