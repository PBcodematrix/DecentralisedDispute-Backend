// const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

const express=require("express");
const morgan=require("morgan");
const cors=require("cors");
const bodyParser=require("body-parser");
const app=express();

const routes=require("./routes/index");



app.use(cors({
    origin:"*",  
    methods:["GET","PATCH","POST","DELETE","PUT"],
    credentials:true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


  

app.use(express.urlencoded({
    extended:true,
}));
app.get("/", (req, res) => res.send("Backend is running !!"));
app.use(routes);


process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close();
});

const http = require("http");
const server = http.createServer(app);


const DB = process.env.DBURI.replace("<db_password>", process.env.DBPASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => {
    console.log("DB connection is succesfull");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`App is running on port ${port}`);
});



module.exports=app; 
