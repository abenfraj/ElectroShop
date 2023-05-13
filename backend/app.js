const express = require("express");
const bodyParser = require("body-parser");
const { initDatabase } = require("./utils/database");
const { signIn } = require("./helpers/user");
const { signUp } = require("./helpers/user");
const { deleteUser } = require("./helpers/user");
const { updateUser } = require("./helpers/user");
const { getProductById } = require("./helpers/product");
const { getQuantityById } = require("./helpers/product");
const { processOrder } = require("./helpers/order");
const { getTotalMoneyMadeByOrders } = require("./helpers/order");
const { getTotalProductsSold } = require("./helpers/order");
const { getTotalMoneyToMake } = require("./helpers/product");

const app = express();
const cors = require("cors");
const PORT = 4206;

const connection = initDatabase();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log("Express app listening on port " + PORT);
});

app.post("/signin", (req, res) => {
  signIn(req, res, connection);
});

app.post("/signup", (req, res) => {
  signUp(req, res, connection);
});

app.post("/deleteuser", (req, res) => {
  deleteUser(req, res, connection);
});

app.post("/updateuser", (req, res) => {
  updateUser(req, res, connection);
});

app.get("/product/:id", (req, res) => {
  getProductById(req, res, connection);
});

app.get("/product-quantity/:id", (req, res) => {
  getQuantityById(req, res, connection);
});

app.get("/process-order/:idUser/:idProduct", (req, res) => {
  processOrder(req, res, connection);
});

app.get("/statistics/money-made", (req, res) => {
  getTotalMoneyMadeByOrders(req, res, connection);
});

app.get("/statistics/products-sold", (req, res) => {
  getTotalProductsSold(req, res, connection);
});

app.get("/statistics/money-to-make", (req, res) => {
  getTotalMoneyToMake(req, res, connection);
});