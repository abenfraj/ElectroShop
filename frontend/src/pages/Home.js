import React, { useEffect, useState } from "react";
import "./Home.scss";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    document.title = "ElectroShop";
    fetch("http://localhost:4206/products")
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

export default Home;
