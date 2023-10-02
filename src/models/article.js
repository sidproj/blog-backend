
const mongoose = require("mongoose");

const sectionSchema = {
    img:{
        type:String,
    },
    text:{
        type:String,
    }
}

const commentsSchema = {
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'user',
        require:[true,"Please enter user."],
    },
    name:{
        type:String,
        require:[true,"Please enter user's name"]
    },
    text:{
        type:String,
        require:[true,"Please enter text in comment."]
    }
}

const articleSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Atricle name is required."],
    },
    topic:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'topic',
        required:[true,"Please select a topic."],
    },
    date:{
        type:Date,
        default:Date.now(),
    },
    sections:{
        type:[sectionSchema],
    },
    comments:{
        type:[commentsSchema],
    }
});

const Article = new mongoose.model('article',articleSchema);

module.exports = Article;
