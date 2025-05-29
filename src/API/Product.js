import axios from "axios";

const Product = axios.create({
  baseURL: "https://fakestoreapi.in/api",
  headers: {
    "Content-Type": "application/json",
  },
});

Product.interceptors.request.use(
  (config) => {
    // console.log(config);
    return config;
  },
  (error) => {
    // console.error(error);
    Promise.reject(error);
  }
);

Product.interceptors.response.use(
  (response) => {
    // console.log(response);
    return response;
  },
  (error) => {
    // console.error(error);
    Promise.reject(error);
  }
);

export default Product;

export const getProduct = (page, limit = 10) =>
  Product.get(`/products?page=${page}&limit=${limit}`);

export const getCategories = () => Product.get(`/products/category`);
