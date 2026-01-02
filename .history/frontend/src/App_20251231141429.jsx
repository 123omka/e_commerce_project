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
import Pa from "./pages/BackGround";

export default function App() {
  return (
    <BrowserRouter>
      <div >
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="*" element={<Login />} />
           <Route path="/productAdmin" element={<AdminAddProduct/>}/>
           <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/p" element={<page/>}/>
          </Routes>
        </div>
      </div>
      
    </BrowserRouter>
    
  );
}
