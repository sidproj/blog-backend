const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

// models
const User = require("./src/models/user");
const Topic = require("./src/models/topic");
const Article = require("./src/models/article");

// controllers
const articleController = require("./src/controllers/articles");

// route
const topics = require("./src/routes/topic");
const articles = require("./src/routes/article");
const users = require("./src/routes/user");

dotenv.config();

const app = express();
const PORT = 5000;

const main = async () =>{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to database");
    app.listen(PORT,()=>{
        console.log(`Server started on port ${PORT}...`);
    });
}

main().catch((e)=>{
    console.log("Error while connecting to database: "+e);
});


// adding middlewares
app.use(
    cors({
        origin:'https://blog-frontend-eight-livid.vercel.app/'
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/src/public"));

// setting view engine to ejs
app.set('views', __dirname + '/src/views');
app.set("view engine", "ejs");

// adding routes
app.use("/topic",topics);
app.use("/article",articles);
app.use("/user",users);

app.get("/",async(req,res)=>{
    res.render("user");
});