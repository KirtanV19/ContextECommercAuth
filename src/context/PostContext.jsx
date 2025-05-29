import { createContext, useState, useEffect } from "react";
import { getPosts } from "../API/Post";
export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);


    const fetchPosts = async () => {
        try {
            const response = await getPosts();
            setPosts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <PostContext.Provider value={{ posts, fetchPosts }}>
            {children}
        </PostContext.Provider>
    );
};
