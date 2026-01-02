import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminAddProduct from "./pages/AdminAddProduct";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/Cartpage";
import CheckoutPage from "./pages/CheckoutPage";
import Footer from "./components/Footer";
import {use}

export default function App() {


   const location = useLocation();

  // Single function to decide which footer to render
  const renderFooter = () => {
    if (location.pathname === "/checkout") return <CheckoutFooter />;
    if (["/product", "/cart"].includes(location.pathname)) return <Footer />;
    return null; // no footer on other pages
  };
  return (
    <BrowserRouter>
      <div >
        <Navbar />
      
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
           <Route path="/productAdmin" element={<ProtectedRoute><AdminAddProduct/></ProtectedRoute>}/>
           <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />

          </Routes>
      
        <Footer/>
      </div>
      
    </BrowserRouter>
    
  );
}
