const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./Mongo/db_connect")
const app = express();
const cors = require("cors")
dbConnect();
app.use(express.json());
app.use(cors())
app.use('/user', require('./config_server/serveSet'))
app.use('/receive', require('./config_server/serveSet'))
app.listen(5000, ()=>
{
    console.log("hello world", process.env.SECRET_KEY);
})
