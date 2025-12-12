import { BrowserRouter, Routes, Route } from "react-router-dom";
import CheckoutPage from "../pages/checkout";
import Greet from "../pages/greet";
import CartPage from "../pages/cartPage";
import MenuPage from "../pages/MenuPage";
import LandingPage from "../pages/landingPage";
import OrdersPage from "../pages/OrdersPage";
import ReviewsPage from "../pages/reviewPage";

// import { CartProvider } from "../context/cartContext";  

export default function AppRouter() {

  return (
    // <CartProvider>   {/* ✅ wrap entire router */}
      <BrowserRouter>
        <Routes>
          <Route path="/:id" element={<LandingPage />} />
          <Route path="/cart/:id" element={<CartPage />} />
          <Route path="/checkout/:id" element={<CheckoutPage />} />
         <Route path="/menu/:id" element={<MenuPage />} /> 
          {/* <Route path="/menu/:restaurantId" element={<MenuPage />} /> */}
          <Route path="/greet/:id" element={<Greet />} />
          <Route path="/orders/:id" element={<OrdersPage />} />
          <Route path="/reviews/:id" element={<ReviewsPage />} />
        </Routes>
      </BrowserRouter>
    // </CartProvider>
  );
}
