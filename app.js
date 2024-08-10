const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");


//model imports


//dotenv
require("dotenv/config");
const api = process.env.API_URL;
const PORT = process.env.PORT || 4001
const app = express();


//middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use('*',cors())

//routers
const productsRouter = require("./routers/product");
const categoriesRouter = require("./routers/categories");
const userRouter = require("./routers/user");
const orderRouter = require("./routers/order");

app.use(`${api}/products`,productsRouter)
app.use(`${api}/categories`,categoriesRouter)
app.use(`${api}/users`,userRouter)
app.use(`${api}/orders`,orderRouter)


// db connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected...");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => console.log("MongoDB connection error:", err));




