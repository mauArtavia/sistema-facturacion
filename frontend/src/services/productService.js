import API from "../services/api";

export const getProducts = () => API.getProducts();

export const createProduct = (data) => API.createProduct(data);