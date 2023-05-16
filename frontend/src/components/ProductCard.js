import React from "react";
import "./ProductCard.scss";
import { Container } from "@mui/material";
import { useLocation } from "react-router-dom";

const ProductCard = ({ cardContent }) => {
  const location = useLocation();
  const currentURL = location.pathname;
  const isHomePage = currentURL === "/";
  const isProductOrderPage = currentURL === "/order-history";
  const user = JSON.parse(localStorage.getItem("user"));

  const handlePurchase = async () => {
    fetch(
      "http://localhost:4206/process-order/" +
        user[0].idUser +
        "/" +
        cardContent.idProduct,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((res) => {
        res.json();

        if (res.status === 401) {
          window.location.href = "/login";
        } else if (res.status === 500) {
          alert(
            "Erreur lors de l'achat du produit, le produit n'est peut-être plus disponible"
          );
        } else {
          alert("Achat effectué avec succès");
        }
      })
      .then((data) => {
        return data;
      });
  };

  return (
    <Container
      sx={{
        width: "100%",
        height: 300,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      maxWidth="lg"
      className="product-container"
    >
      <div className="card-wrap">
        <div className="card front-card">
          <div className="image-container">
            <img src={cardContent.imageProduct} className="card-image" />
          </div>
        </div>
        <div className="card back-card" />
      </div>
      {isHomePage && (
        <div className="product-info">
          <div>
            <h3>{cardContent.labelProduct}</h3>
            <p>{cardContent.idProduct}</p>
          </div>
          <h2>{cardContent.priceProduct}€</h2>
          <button onClick={handlePurchase}>Acheter</button>
        </div>
      )}
      {isProductOrderPage && (
        <div className="product-info">
          <div>
            <h3>ID Commande : {cardContent.idOrder}</h3>
            <p>ID Produit : {cardContent.idProduct}</p>
            <p>{cardContent.labelProduct}</p>
            <p>
              {new Date(cardContent.dateOrder).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </div>
          <h2>{cardContent.priceProduct}€</h2>
        </div>
      )}
    </Container>
  );
};

export default ProductCard;
