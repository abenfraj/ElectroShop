const { v4: uuidv4 } = require("uuid");
require("dotenv").config();


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
        res.status(200).json({ message: "Connexion réussie" });
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
  const { firstName, lastName, email, password, phoneNumber } = req.body;
  const sql =
    "INSERT INTO user (idUser, firstNameUser, lastNameUser, emailUser, passwordUser, phoneNumberUser) VALUES (?, ?, ?, ?, aes_encrypt(?, ?), ?)";
  const values = [id, firstName, lastName, email, password, process.env.ENCRYPTION_KEY, phoneNumber];
  connection.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Erreur lors de l'inscription" });
    } else {
      res.status(200).json({ message: "Inscription réussie" });
    }
  });
};

module.exports = {
  signIn,
  signUp,
};
