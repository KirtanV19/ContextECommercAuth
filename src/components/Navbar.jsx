import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ProductContext } from "../context/ProductContext";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@material-tailwind/react";

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const { cart, clearCart } = useContext(ProductContext);

    const handleCartClick = () => {
        if (user) {
            navigate("/cart");
        } else {
            navigate("/login");
        }
    };

    const handleLogout = () => {
        logout();
        clearCart();
    };

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md px-8 py-3 flex items-center justify-between">
            {/* Left: Logo or Brand */}
            <div className="flex items-center gap-6">
                <Link
                    to="/"
                    className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                    ShopEase
                </Link>
                <Link
                    to="/"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                    Home
                </Link>
                <Link
                    to="/about"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                    About
                </Link>
            </div>

            {/* Right: Cart & Auth */}
            <div className="flex items-center gap-6">
                {/* Cart Icon - shown to all, functional only if logged in */}
                <button
                    onClick={handleCartClick}
                    className="relative flex items-center group"
                    aria-label="Cart"
                >
                    <Badge
                        content={cart.length}
                        color="blue"
                        className="absolute -top-2 -right-2"
                    >
                        <FiShoppingCart className="text-2xl text-gray-700 group-hover:text-blue-600 transition-colors" />
                    </Badge>
                </button>

                {/* Authenticated User */}
                {user ? (
                    <button
                        onClick={handleLogout}
                        className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-800 transition font-semibold"
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-800 transition font-semibold"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
