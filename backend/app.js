const express = require('express');
const bodyParser = require('body-parser');
const { initDatabase } = require('./utils/database');
const { signIn } = require('./helpers/user');
const { signUp } = require('./helpers/user');
const { sqlQueryTest } = require('./helpers/user');

const app = express();
const cors = require('cors');
const PORT = 4206;

const connection = initDatabase();

app.use(cors());
app.use(express.json())

app.listen(PORT, () => {
  console.log('Express app listening on port ' + PORT);
});

app.post('/signin', (req, res) => {
  signIn(req, res, connection);
});

app.post('/signup', (req, res) => {
  signUp(req, res, connection);
});