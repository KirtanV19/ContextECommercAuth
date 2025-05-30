import { useState, useEffect } from "react";
import { ProductProvider } from "./context/ProductContext";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import ProductCart from "./components/ProductCart";
import Navbar from "./components/Navbar";
import About from "./components/About";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthRoute from "./routes/AuthRoute";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import Splashscreen from "./components/Splashscreen";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showSplash ? (
        <Splashscreen key="splash" />
      ) : (
        <Router key='main'>
          <AuthProvider>
            <ProductProvider>
              <Toaster />
              <Navbar />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Products />} />
                <Route path="/about" element={<About />} />
                {/* Protected Route */}
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <ProductCart />
                    </ProtectedRoute>
                  }
                />
                {/* Auth Routes */}
                <Route
                  path="/login"
                  element={
                    <AuthRoute>
                      <Login />
                    </AuthRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <AuthRoute>
                      <Register />
                    </AuthRoute>
                  }
                />
                {/* Not Found */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ProductProvider>
          </AuthProvider>
        </Router>
      )}
    </AnimatePresence>
  );
};

export default App;
