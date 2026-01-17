import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Sunglasses from "./pages/Sunglasses";
import Eyeglasses from "./pages/Eyeglasses";
import Goggles from "./pages/Goggles";
import ColorChanging from "./pages/ColorChanging";
import SmartGlasses from "./pages/SmartGlasses";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Buy from "./pages/Buy";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Logout from "./pages/Logout";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { useEffect } from "react";
import { useStore } from "./store/useStore";


export default function App() {


function App() {
  const user = useStore((s) => s.user);
  const fetchUserData = useStore((s) => s.fetchUserData);

  useEffect(() => {
    if (user) fetchUserData();
  }, [user, fetchUserData]);

  return <>...</>;
}


  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sunglasses" element={<Sunglasses />} />
        <Route path="/eyeglasses" element={<Eyeglasses />} />
        <Route path="/goggles" element={<Goggles />} />
        <Route path="/color-changing" element={<ColorChanging />} />
        <Route path="/smart-glasses" element={<SmartGlasses />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        
      </Routes>
      <a href="mailto:support@luxeyewear.com" className="support-widget">💬 Help</a>
    </div>
    
  );
}


