// app.js
const express = require("express");
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

const app = express();

// app.use(morgan('dev'))
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('common'))
}
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World from Express!");
});

app.get("/api/items", (req, res) => {
  res.json([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
  ]);
});

module.exports = app;