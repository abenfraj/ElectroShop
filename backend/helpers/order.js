const { getQuantityById, removeQuantity } = require('./product');
const { v4: uuidv4 } = require("uuid");

/**
 * Process the order of a product
 * @param {*} req 
 * @param {*} res 
 * @param {*} connection 
 */
const processOrder = async (req, res, connection) => {
    try {
      const { idProduct, idUser } = req.params;
  
      // Call the getQuantityById function and await the result
      const productAvailability = await getQuantityById(res, req, connection, idProduct);
  
      if (productAvailability < 1) {
        res.status(500).json({ message: "Le produit n'est plus disponible" });
      } else {
        addOrder(req, res, connection, idProduct, idUser);
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
 * @returns {Object} - The result of the query
 */
const addOrder = (req, res, connection, idProduct, idUser) => {
    const idOrder = uuidv4();
    const sql = "INSERT INTO `order` (idOrder, idProduct, idUser) VALUES (?, ?, ?)";
    const values = [idOrder, idProduct, idUser];
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

module.exports = {
    processOrder,
    getTotalMoneyMadeByOrders,
    getTotalProductsSold
}