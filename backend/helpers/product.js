/**
 * Get a product by its id
 * @param {Object} req
 * @param {Object} res
 * @param {Object} connection
 * @returns {Object} - The result of the query
 */
const getProductById = (req, res, connection) => {
  const { id } = req.params;
  const sql = "SELECT * FROM product WHERE idProduct = ?";
  const values = [id];
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération du produit" });
    } else {
      console.log(result);
      res.status(200).json(result);
    }
  });
};

/**
 * Get the quantity of a product by its id
 * @param {*} req
 * @param {*} res
 * @param {*} connection
 */
const getQuantityById = (req, res, connection, id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT quantityProduct FROM product WHERE idProduct = ?";
    const values = [id];
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.log(err);
        reject("Erreur lors de la récupération de la quantité");
      } else {
        resolve(result[0].quantityProduct);
      }
    });
  });
};

/**
 * Remove 1 to the quantity of a product by its id
 * @param {*} req
 * @param {*} res
 * @param {*} connection
 * @param {*} idProduct
 */
const removeQuantity = (req, res, connection, idProduct) => {
  const sql =
    "UPDATE product SET quantityProduct = quantityProduct - 1 WHERE idProduct = ?";
  const values = [idProduct];
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Erreur lors de la mise à jour de la quantité" });
    }
  });
};

/**
 * Sums the price of all products left to sell
 * @param {*} req 
 * @param {*} res 
 * @param {*} connection 
 */
const getTotalMoneyToMake = (req, res, connection) => {
    const sql = "SELECT SUM(priceProduct * quantityProduct) AS totalMoneyToMake FROM product";
    connection.query(sql, (err, result) => {
        if (err) {
        console.log(err);
        res.status(500).json({ message: "Erreur lors de la récupération du chiffre d'affaires" });
        } else {
        res.status(200).json(result);
        }
    });
};

module.exports = {
  getProductById,
  getQuantityById,
  removeQuantity,
  getTotalMoneyToMake,
};
