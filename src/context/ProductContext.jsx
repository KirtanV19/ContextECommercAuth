import { createContext, useEffect, useState } from "react";
import { getProduct, getCategories } from "../API/Product";
import toast from "react-hot-toast";
// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchProduct = async (page) => {
        try {
            const response = await getProduct(page);
            setProducts(response.data.products || []); // Handle the new API response structure
            const total = 150; // Get total from API or fallback to 150
            const perPage = 10; // Get per_page from API or fallback to 10
            setTotalPages(Math.ceil(total / perPage));
        } catch (error) {
            console.error("Failed to fetch products:", error);
            toast.error("Failed to load products");
        }
    };

    const fetchCategory = async () => {
        try {
            const response = await getCategories();
            setCategories(response.data.categories);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProduct(currentPage);
    }, [currentPage]);

    useEffect(() => {
        fetchCategory();
    }, []);

    const addToCart = (product) => {
        const exist = cart.find((item) => item.id === product.id);
        if (exist) {
            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
        toast.success(`${product.title} added`);
        console.log('product', product)
    };

    const removeFromCart = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    const addQuantity = (id) => {
        setCart(
            cart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const removeQuantity = (id) => {
        setCart(
            cart.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity > 1 ? item.quantity - 1 : 1,
                    }
                    : item
            )
        );
    };

    const clearCart = () => setCart([]);
    return (
        <ProductContext.Provider
            value={{
                products,
                fetchProduct,
                cart,
                addToCart,
                removeFromCart,
                addQuantity,
                removeQuantity,
                currentPage,
                setCurrentPage,
                totalPages,
                categories,
                setSelectedCategories,
                selectedCategories,
                searchQuery,
                setSearchQuery,
                clearCart,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
