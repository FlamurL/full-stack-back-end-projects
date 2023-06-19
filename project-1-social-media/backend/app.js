import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";


const app =express();
app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog",blogRouter);
mongoose
     .connect('mongodb+srv://admin:Yc5VPy8Hc7UPuP1s@cluster0.xlgilge.mongodb.net/Blog?retryWrites=true&w=majority'
)
.then(()=>app.listen(5000))
.then(()=>
console.log("Connected to Database and Listening to localhost 5000")
)
.catch((err)=> console.log(err));



//Yc5VPy8Hc7UPuP1s