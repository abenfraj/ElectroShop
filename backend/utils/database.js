const mysql = require('mysql2');

const initDatabase = () => {
    const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'electroshop'
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database ' + connection.config.database + ' on ' + connection.config.host + ' as ' + connection.config.user + '.');
  });

  return connection;
}

module.exports = {
    initDatabase
}