import { useContext } from "react";
import { Products } from "../assets/utils/Products";
import { ProductContext } from '../context/ProductContext'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProductList = () => {
    const { addToCart, products } = useContext(ProductContext);
    const { user } = useContext(AuthContext)
    let navigate = useNavigate();

    const handleClick = (item) => {
        if (user) {
            addToCart(item)
        } else {
            navigate("/login");
        }
    };
    return (
        <>
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-semibold mb-6">Products</h2>
                <div className="grid gap-4">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="border rounded-lg p-4 flex justify-between items-center"
                        >
                            <div>
                                <h3 className="text-lg font-medium">{product.name}</h3>
                                <p className="text-gray-600">Price: ${product.price}</p>
                            </div>
                            <button
                                onClick={() => handleClick(product)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                Add To Cart
                            </button>
                        </div>
                    ))}
                    <button
                        className="flex place-self-end bg-brown-500 mr-5 hover:bg-brown-600 text-white px-4 py-2 rounded-lg transition-colors"
                        onClick={() => navigate("/cart")}
                    >
                        Go To Cart
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProductList;
