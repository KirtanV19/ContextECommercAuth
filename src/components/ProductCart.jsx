import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { Typography, IconButton } from "@material-tailwind/react";
import { PlusIcon, MinusIcon, TrashIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import PageWrapper from "../utils/PageWrapper";

const ProductCart = () => {

    const { cart, removeFromCart, addQuantity, removeQuantity } = useContext(ProductContext);

    // const totalQuantity = cart.reduce((item, acc) => acc + item.quantity, 0); wrong order in parameters
    /* const totalPrice = cart.reduce(
          (item, acc) => acc + item.price * item.quantity,
          0
      );   Wrong order in passing parameters */

    const totalItems = cart.length;
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const handleCheckOut = () => {
        toast.success("Ordered Place !!!");
        console.log(cart);
    };

    return (
        <PageWrapper>
            <div className="container mx-auto px-4 py-8">
                <Typography variant="h4" className="mb-6">
                    Your Cart
                </Typography>
                {cart.length === 0 ? (
                    <Typography>No items in cart.</Typography>
                ) : (
                    <>
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center mb-4 p-4 border-b"
                            >
                                <div>
                                    <Typography variant="h6">{item.title}</Typography>
                                    <Typography color="gray">${item.price}</Typography>
                                    <div className="flex items-center mt-2 gap-2">
                                        <IconButton
                                            size="sm"
                                            variant="outlined"
                                            onClick={() => removeQuantity(item.id)}
                                        >
                                            <MinusIcon className="h-4 w-4" />
                                        </IconButton>
                                        <span className="text-lg">{item.quantity}</span>
                                        <IconButton
                                            size="sm"
                                            variant="outlined"
                                            onClick={() => addQuantity(item.id)}
                                        >
                                            <PlusIcon className="h-4 w-4" />
                                        </IconButton>
                                    </div>
                                </div>
                                <IconButton
                                    variant="text"
                                    color="red"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </IconButton>
                            </div>
                        ))}
                        <div className="border-t pt-4 mt-4 text-right space-y-2">
                            <p className="text-sm text-gray-600">Total Items: {totalItems}</p>
                            <p className="text-sm text-gray-600">
                                Total Quantity: {totalQuantity}
                            </p>
                            <p className="text-lg font-semibold">Total Price: ${totalPrice}</p>
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
        </PageWrapper>
    );
};

export default ProductCart;
