import axios from "./axios";

const productApi = {
    getProducts: () => {
        const url = "/product/getProducts";
        return axios.post(url);
    },
    getProductsDisable: () => {
        const url = "/product/getProductsDisable";
        return axios.post(url);
    },
    getProductBySlug: (slug) => {
        const url = `/product/${slug}`;
        return axios.get(url);
    },
    addProductReview: (review) => {
        const url = "/product/addProductReview";
        return axios.post(url, review);
    },
    setDisableProduct: (productId) => {
        const url = "/product/setDisableProduct";
        return axios.post(url, productId)
    },
    setDisableProductFasle: (productId) => {
        const url = "/product/setDisableProductFasle";
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
};

export default productApi;
