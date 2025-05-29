import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import toast from "react-hot-toast";

const Cart = () => {

    const { carts, deleteCart, decrementQuantity, incrementQuantity } =
        useContext(ShopContext);

    const totalItems = carts.length;
    const totalQuantity = carts.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = carts.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const handleCheckOut = () => {
        toast.success("Ordered Placed");
        console.log(carts);
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
            {carts.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No items in cart</p>
            ) : (
                <>
                    <div className="grid gap-4">
                        {carts.map((cart) => (
                            <div
                                key={cart.id}
                                className="border rounded-lg p-4 flex flex-col gap-2 md:flex-row md:justify-between md:items-center"
                            >
                                <div>
                                    <h3 className="text-lg font-medium">{cart.name}</h3>
                                    <p className="text-gray-600">${cart.price * cart.quantity}</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => decrementQuantity(cart.id)}
                                            className="bg-gray-300 px-3 py-1 rounded text-lg"
                                        >
                                            -
                                        </button>
                                        <span className="text-lg">{cart.quantity}</span>
                                        <button
                                            onClick={() => incrementQuantity(cart.id)}
                                            className="bg-gray-300 px-3 py-1 rounded text-lg"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => deleteCart(cart.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="border-t pt-4 mt-4 text-right space-y-2">
                        <p className="text-sm text-gray-600">Total Items: {totalItems}</p>
                        <p className="text-sm text-gray-600">
                            Total Quantity: {totalQuantity}
                        </p>
                        <p className="text-lg font-semibold">
                            Total Price: ${totalPrice.toFixed(2)}
                        </p>
                        <button
                            onClick={handleCheckOut}
                            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
