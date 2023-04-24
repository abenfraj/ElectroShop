import * as React from "react";
import Link from "@mui/material/Link";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Box from "@mui/material/Box";
import "./Layout.scss";
import { Typography } from "@mui/material";

const pages = [
  {
    name: "Cart",
    url: "/cart",
    display: "Mon panier",
    MUIicon: <LocalMallOutlinedIcon />,
  },
  {
    name: "Order History",
    url: "/order-history",
    display: "Historique des commandes",
    MUIicon: <ReceiptLongOutlinedIcon />,
  },
  {
    name: "Login",
    url: "/login",
    display: "Me connecter",
    MUIicon: <AccountCircleOutlinedIcon />,
  },
];

const Layout = () => {
  return (
    <div className="wrapper">
      <div className="multi_color_border"></div>
      <div className="top_nav">
        <div className="left">
          <div className="logo">
            <p>ElectroShop</p>
          </div>
        </div>
        <div className="right">
          <ul>
            <li>
              <a href="#">Whats Next</a>
            </li>
            <li>
              <a href="#">LogIn</a>
            </li>
            <li>
              <a href="#">SignUp</a>
            </li>
            <li>
              <a href="#">Post a Job</a>
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
export default Layout;
