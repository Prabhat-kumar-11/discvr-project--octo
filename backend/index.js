require("dotenv").config();
const express = require("express");
const cors = require("cors");
const products = require("./products");
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());



app.get("/api/products", (req, res) => {


  res.json(products);
});

app.listen(PORT, (error) => {
  if (error) {
    console.error("Server is not running:", error);
  } else {
    console.log("Server running on port", PORT);
  }
});