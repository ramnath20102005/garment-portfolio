const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const companyRoutes = require("./routes/company");
const productRoutes = require("./routes/products");


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/company", companyRoutes);
app.use("/api/products", productRoutes);


// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/garment_portfolio")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});