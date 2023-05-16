import { useEffect } from "react";
import { useState } from "react";
import ProductCard from "../components/ProductCard";

const OrderHistory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    document.title = "ElectroShop - Order History";
    const user = JSON.parse(localStorage.getItem("user"));
  
    fetch("http://localhost:4206/orders/" + user[0].idUser, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + document.cookie.split("=")[1],
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
        <div key={product.idProduct}>
          <ProductCard cardContent={product} />
        </div>
      ))}
    </section>
  );
};

export default OrderHistory;
