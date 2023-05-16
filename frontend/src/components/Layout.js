import * as React from "react";
import LoggedInLayout from "./LoggedInLayout";
import LoggedOutLayout from "./LoggedOutLayout";

const Layout = ({ isLoggedIn }) => {
  return isLoggedIn ? <LoggedInLayout /> : <LoggedOutLayout />;
};
export default Layout;
