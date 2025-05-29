import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const ShopContext = createContext();

const ShopProvider = ({ children }) => {

    const [carts, setCarts] = useState([]);

    const addToCart = (item) => {
        const existingItem = carts.find((cart) => cart.id === item.id);
        // console.log(existingItem);

        if (existingItem) {
            setCarts(
                carts.map((cart) =>
                    cart.id === item.id ? { ...cart, quantity: cart.quantity + 1 } : cart
                )
            );
        } else {
            setCarts([...carts, item]);
        }
        toast.success(`${item.name} added to cart.`);
    };

    const deleteCart = (id) => {
        setCarts(carts.filter((cart) => cart.id !== id));
    };

    const incrementQuantity = (id) => {
        setCarts(
            carts.map((cart) =>
                cart.id === id ? { ...cart, quantity: cart.quantity + 1 } : cart
            )
        );
    };

    const decrementQuantity = (id) => {
        setCarts(
            carts
                .map((cart) =>
                    cart.id === id ? { ...cart, quantity: cart.quantity - 1 } : cart
                )
                .filter((cart) => cart.quantity > 0)
        );
    };

    return (
        <ShopContext.Provider
            value={{
                carts,
                addToCart,
                deleteCart,
                incrementQuantity,
                decrementQuantity,
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};

export default ShopProvider;

/*
const deleteCart = (id) => {
    const existingItem = carts.find((cart) => cart.id === id);
    // console.log(existingItem);
    if (existingItem) {
        if (existingItem.quantity > 1) {
            setCarts(
                carts.map((cart) =>
                    cart.id === id ? { ...cart, quantity: cart.quantity - 1 } : cart
                )
            );
        } else {
            setCarts(carts.filter((cart) => cart.id !== id));
        }
    }
};
*/
