const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();

// Cho phép API đọc JSON
app.use(express.json());

// API kiểm tra server
app.get("/", (req, res) => {
  res.json({
    message: "Product API is running - CI/CD test"
  });
});

// Healthcheck cho Product API
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok"
  });
});

// Đăng ký Product API
app.use("/api/products", productRoutes);

// Kết nối MongoDB rồi mới chạy server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });