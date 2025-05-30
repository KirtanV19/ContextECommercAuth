import { useState, useEffect } from "react";
import { ProductProvider } from "./context/ProductContext";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
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

const AnimatedRoutes = () => {

  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <ProductCart />
            </ProtectedRoute>
          }
        />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <AnimatePresence mode="wait">
        <Splashscreen key="splash" />
      </AnimatePresence>
    );
  }

  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <Toaster />
          <Navbar />
          <AnimatedRoutes />
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
