const express = require('express');
const app = express();
require('dotenv').config();

const db = require('./models');

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('This is the GET / route.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`The server is up and running on PORT ${PORT}`);
});
