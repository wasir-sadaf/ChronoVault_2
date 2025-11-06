const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const authRoute = require("./route/authRoute");
const capsuleRoutes = require("./route/capsuleRoute");

app.use("/auth", authRoute);
app.use("/capsules", capsuleRoutes);

const port = 3000;
app.listen(port, ()=>{
    console.log("backend online");
})