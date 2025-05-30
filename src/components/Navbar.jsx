import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ProductContext } from "../context/ProductContext";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@material-tailwind/react";
import { motion } from "framer-motion";

const navHover = {
    whileHover: { scale: 1.1 },
    transition: { type: "spring", stiffness: 300 }
};

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
                <motion.div {...navHover}>
                    <Link
                        to="/"
                        className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        ShopEase
                    </Link>
                </motion.div>
                <motion.div {...navHover}>
                    <Link
                        to="/"
                        className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    >
                        Home
                    </Link>
                </motion.div>
                <motion.div {...navHover}>
                    <Link
                        to="/about"
                        className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    >
                        About
                    </Link>
                </motion.div>
            </div>

            {/* Right: Cart & Auth */}
            <div className="flex items-center gap-6">
                {/* Cart Icon */}
                <motion.button
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 80 }}
                    onClick={handleCartClick}
                    className="relative flex items-center"
                    aria-label="Cart"
                >
                    <Badge
                        content={cart.length}
                        color="blue"
                        className="absolute -top-2 -right-2"
                    >
                        <FiShoppingCart className="text-2xl text-gray-700" />
                    </Badge>
                </motion.button>

                {/* Auth Buttons */}
                {user ? (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLogout}
                        className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-800 transition font-semibold"
                    >
                        Logout
                    </motion.button>
                ) : (
                    <>
                        <motion.div {...navHover}>
                            <Link
                                to="/login"
                                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                            >
                                Login
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                to="/register"
                                className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-800 transition font-semibold"
                            >
                                Register
                            </Link>
                        </motion.div>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
