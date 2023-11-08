require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const ebookRoutes = require("./routes/books");
const userRoutes = require("./routes/user");
const cartRoutes = require("./routes/cart");
const wishlistRoutes = require("./routes/wishlist");
const orderRoutes = require("./routes/order");
const recomRoutes = require("./routes/recom");
const app = express();

app.use(express.json());

app.use("/api/book", ebookRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/recom", recomRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Listening on port", process.env.PORT);
    });
  })
  .catch(error => {
    console.log(error);
  });
