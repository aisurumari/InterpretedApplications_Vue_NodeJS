const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRoute = require("./routes/product");
const categoryRoute = require("./routes/category");
const order_stateRoute = require("./routes/orderState");
const orderRoute = require("./routes/order");

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB connection succesfull"))
.catch((err) => {
    console.log("Error of DB!")
});

app.use(express.json());
app.use("/api/product",productRoute);
app.use("/api/categories",categoryRoute);
app.use("/api/status",order_stateRoute);
app.use("/api/orders",orderRoute);

app.listen(5000, ()=>{
    console.log("Backend server is running");
});

