const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const { generateAccessToken } = require("./auth");

/**
 * Gets the form data, checks if it matches the database and sends the result
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Object} connection - The database connection
 * @returns {Object} - The result of the query
 */
const signIn = (req, res, connection) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM user WHERE emailUser = ? AND cast(aes_decrypt(passwordUser, ?) as char(50)) = ?";
  const values = [email, process.env.ENCRYPTION_KEY, password];
  connection.query(sql, values, (err, result) => {
    if (err) {
    console.log(err);
      res.status(500).json({ message: "Erreur lors de la connexion" });
    } else {
      if (result.length > 0) {
        const token = generateAccessToken({ result });
        res.status(200).json(token);
      } else {
        res.status(401).json({ message: "Identifiants incorrects" });
      }
    }
  });
};

/**
 * Gets the form data, checks if it can be inserted in the database and sends the result
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Object} connection - The database connection
 * @returns {Object} - The result of the query
 */
const signUp = (req, res, connection) => {
  const id = uuidv4();
  const { firstName, lastName, email, password } = req.body;
  const sql =
    "INSERT INTO user (idUser, firstNameUser, lastNameUser, emailUser, passwordUser) VALUES (?, ?, ?, ?, aes_encrypt(?, ?))";
  const values = [id, firstName, lastName, email, password, process.env.ENCRYPTION_KEY];
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Erreur lors de l'inscription" });
    } else {
      const token = generateAccessToken({ result });
      res.status(200).json({ message: "Inscription réussie" });
    }
  });
};

/**
 * Deletes a user from the database
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} connection 
 */
const deleteUser = (req, res, connection) => {
  const { id } = req.body;
  const sql = "DELETE FROM user WHERE idUser = ?";
  const values = [id];
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Erreur lors de la suppression" });
    } else {
      res.status(200).json({ message: "Suppression réussie" });
    }
  });
};

/**
 * Updates a user in the database
 * @param {Object} req
 * @param {Object} res
 * @param {Object} connection
 * @returns {Object} - The result of the query
 */
const updateUser = (req, res, connection) => {
  const { id, firstName, lastName, email, password } = req.body;
  const sql = "UPDATE user SET firstNameUser = ?, lastNameUser = ?, emailUser = ?, passwordUser = aes_encrypt(?, ?) WHERE idUser = ?";
  const values = [firstName, lastName, email, password, process.env.ENCRYPTION_KEY, id];
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Erreur lors de la mise à jour" });
    } else {
      res.status(200).json({ message: "Mise à jour réussie" });
    }
  });
};

const getUserInfoByEmail = (req, res, connection) => {
  const { email } = req.params;
  const sql = "SELECT * FROM user WHERE emailUser = ?";
  const values = [email];
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Erreur lors de la récupération des informations" });
    } else {
      res.status(200).json(result);
    }
  });
};

module.exports = {
  signIn,
  signUp,
  deleteUser,
  updateUser,
  getUserInfoByEmail,
};
