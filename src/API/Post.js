import axios from "axios";

const Post = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: { "Content-Type": "application/json" },
});

Post.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    console.log("Request:", config);
    return config;
  },
  (error) => {
    // Do something with request error
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);
Post.interceptors.response.use(
  (response) => {
    // Do something with response data
    console.log("Response:", response);
    return response;
  },
  (error) => {
    // Do something with response error
    console.error("Response Error:", error);
    return Promise.reject(error);
  }
);

export default Post;
export const getPosts = () => Post.get("/posts");
