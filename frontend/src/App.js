import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  return (
    <div className="App">
      <Router>
        <Layout />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product-info" element={<ProductInfo />} />
          <Route path="/order-info" element={<OrderInfo />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
      {/* <div className="ocean">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div> */}
    </div>
  );
};

export default App;
