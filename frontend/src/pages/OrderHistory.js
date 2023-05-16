import { useEffect } from "react";
import { useState } from "react";
import ProductCard from "../components/ProductCard";

const OrderHistory = () => {
  const [products, setProducts] = useState([]);
  const url = window.location.href;

  useEffect(() => {
    document.title = "ElectroShop - Order History";
    const user = JSON.parse(localStorage.getItem("user"));

    fetch("http://localhost:4206/orders/" + user[0].idUser, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <section>
      {products.map((product) => (
        <div key={url === "http://localhost:3000/order-history" ? product.idOrder : product.idProduct}>
          <ProductCard cardContent={product} />
        </div>
      ))}
    </section>
  );
};

export default OrderHistory;
