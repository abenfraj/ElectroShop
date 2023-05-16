import * as React from "react";
import Link from "@mui/material/Link";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Box from "@mui/material/Box";
import "./Layout.scss";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

const pages = [
  {
    name: "Cart",
    url: "/cart",
    display: "Mon panier",
    MUIicon: <LocalMallOutlinedIcon />,
    action: "",
  },
  {
    name: "Order History",
    url: "/order-history",
    display: "Historique des commandes",
    MUIicon: <ReceiptLongOutlinedIcon />,
    action: "handleOrderHistory",
  },
  {
    name: "Login",
    url: "/login",
    display: "Me déconnecter",
    MUIicon: <AccountCircleOutlinedIcon />,
    action: "handleSignOut",
  },
];

const LoggedInLayout = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleOrderHistory = () => {
    window.location.href = "/order-history";
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="wrapper">
      <div className="multi_color_border"></div>
      <div className="top_nav">
        <div className="left">
          <div className="logo">
            
              <a href="/"><p>ElectroShop</p></a>
            
          </div>
        </div>
        <div className="right">
          <ul>
            <li>
              <a href="#">Multimédia</a>
            </li>
            <li>
              <a href="#">Ordinateurs et PCs</a>
            </li>
            <li>
              <a href="#">Consoles</a>
            </li>
            <li>
              <a href="#">Hardware</a>
            </li>
            <li>
              <a>Bonjour, {user[0]?.firstNameUser}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="bottom_nav">
        <ul>
          {pages.map((page) => (
            <li key={page.name}>
              <Link
                underline="hover"
                color="inherit"
                key={page.name}
                href={page.url}
                onClick={() => {
                  if (page.action) {
                    eval(page.action)();
                  }
                }}
              >
                <Box
                  sx={{
                    flexDirection: "row",
                    alignItems: "center",
                    display: "flex",
                    width: "100%",
                  }}
                >
                  {page.MUIicon}
                  <Typography variant="body2" sx={{ ml: 2, mt: 0.2 }}>
                    {page.display}
                  </Typography>
                </Box>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default LoggedInLayout;
