const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:[true,"Topic name is required."],
        uppercase:true,
    },
    description:{
        type:String,
        required:[true,"Topic description is required."]
    }
});

const Topic = new mongoose.model('topic',topicSchema);

module.exports = Topic;