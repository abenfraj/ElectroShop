import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Cart from "./pages/Cart";
import ProductInfo from "./pages/ProductInfo";
import OrderInfo from "./pages/OrderInfo";
import OrderHistory from "./pages/OrderHistory";
import NoPage from "./pages/NoPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Layout isLoggedIn={isLoggedIn} />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Registration setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product-info" element={<ProductInfo />} />
          <Route path="/order-info" element={<OrderInfo />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
