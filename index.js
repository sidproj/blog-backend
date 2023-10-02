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

app.use(
    cors({
        origin:"*",
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/topic",topics);
app.use("/article",articles);
app.use("/user",users);


app.get("/",async(req,res)=>{
    const articles = await Article.find();
    res.send(articles);
});

// app.get("/topics/:id",topicController.get_all_topics)
// app.get("/topic",topicController.get_topic_by_name)



// app.get("/createArticle",async(req,res)=>{
//     const article = Article({
//         name:"Pokemon BW: Zekrom review",
//         topic:"65060997bcaec056df50ceba",
//         sections:{
//             img:"https://res.cloudinary.com/image-testing/image/upload/v1694899212/Blog%20website/Zekrom_M14.0_yfhnuj.jpg",
//             text:"Zekrom is a legendary Pokémon known for its imposing design, blending dragon and electric elements. Its high Attack and Special Attack stats, along with the Teravolt ability, make it formidable in battles. With moves like Bolt Strike and Dragon Claw, it boasts strong offensive capabilities. Zekrom is a popular choice in competitive play and is significant in Pokémon lore, particularly in Pokémon Black and White, where it symbolizes truth. Its unique typing and iconic presence make it a standout Pokémon in the series.",
//         }
//     })
//     await article.save();
//     res.send(article);
// })