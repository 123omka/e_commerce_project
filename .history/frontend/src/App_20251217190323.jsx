import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductSend from "./pages/ProductSend";
import menPage from './pages/menPage'

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
            <Route path="product"  element={<ProductSend/>}/>
            <Route
          </Routes>
        </div>
      </div>
      <menPage/>
    </BrowserRouter>
    
  );
}
