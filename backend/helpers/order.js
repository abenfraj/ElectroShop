const { getQuantityById, removeQuantity } = require('./product');
const { v4: uuidv4 } = require("uuid");
const { getPriceProductById } = require("./product");

/**
 * Process the order of a product
 * @param {*} req 
 * @param {*} res 
 * @param {*} connection 
 */
const processOrder = async (req, res, connection) => {
    try {
      const { idProduct, idUser } = req.params;
      const priceProduct = await getPriceProductById(res, req, connection, idProduct);
      console.log(priceProduct);
      const productAvailability = await getQuantityById(res, req, connection, idProduct);
  
      if (productAvailability < 1) {
        res.status(500).json({ message: "Le produit n'est plus disponible" });
      } else {
        addOrder(req, res, connection, idProduct, idUser, priceProduct);
        removeQuantity(req, res, connection, idProduct);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Une erreur s'est produite lors du traitement de la commande" });
    }
  };

/**
 * Inserts a new order in the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} connection 
 * @param {*} idProduct
 * @param {*} idUser
 * @param {*} priceProduct
 * @returns {Object} - The result of the query
 */
const addOrder = (req, res, connection, idProduct, idUser, priceProduct) => {
    const idOrder = uuidv4();
    const sql = "INSERT INTO `order` (idOrder, idProduct, idUser, priceProduct, dateOrder) VALUES (?, ?, ?, ?, ?)";
    const values = [idOrder, idProduct, idUser, priceProduct, new Date()];
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Erreur lors de la création de la commande" });
        } else {
            res.status(200).json({ message: "La commande a bien été créée" });
        }
    });
}

/**
 * Gets the total money made by orders
 * @param {*} req 
 * @param {*} res 
 * @param {*} connection 
 */
const getTotalMoneyMadeByOrders = (req, res, connection) => {
    const sql = "SELECT SUM(priceProduct) AS totalMoneyMade FROM `order` INNER JOIN product ON `order`.idProduct = product.idProduct";
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Erreur lors de la récupération du chiffre d'affaires" });
        } else {
            res.status(200).json(result);
        }
    });
}

/**
 * Counts the amount of products sold
 * @param {*} req 
 * @param {*} res 
 * @param {*} connection 
 */
const getTotalProductsSold = (req, res, connection) => {
    const sql = "SELECT COUNT(*) AS totalProductsSold FROM `order` INNER JOIN product ON `order`.idProduct = product.idProduct";
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Erreur lors de la récupération du nombre de produits vendus" });
        } else {
            res.status(200).json(result);
        }
    });
}

/**
 * Gets the order history of a user
 * @param {*} req 
 * @param {*} res 
 * @param {*} connection 
 * @returns {Object} - The result of the query
 */
const getOrdersByUserId = (req, res, connection) => {
    const sql = "SELECT * FROM `order` INNER JOIN product ON `order`.idProduct = product.idProduct WHERE idUser = ?";
    const values = [req.params.idUser];
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Erreur lors de la récupération de l'historique des commandes" });
        } else {
            res.status(200).json(result);
        }
    });
}

module.exports = {
    processOrder,
    getTotalMoneyMadeByOrders,
    getTotalProductsSold,
    getOrdersByUserId
}