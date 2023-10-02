const Topic = require("../models/topic")

module.exports.get_all_topics = async(req,res)=>{
    if(req.params.id){
        try{
            const topic = await Topic.findById(req.params.id);
            if(!topic) throw Error("Topic not found!");
            res.send(topic);
        }catch(e){
            console.log(e.message);
            res.send(e.message);
        }
    }else{
        const topics = await Topic.find();
        res.send(topics);
    }
}

module.exports.get_topic_by_id = async(req,res)=>{
    try{
        const topic = await Topic.findById(req.params.id);
        if(!topic) throw Error("Topic not found!");
        res.send(topic);
    }catch(e){
        console.log(e.message,e);
        res.send(e.message);
    }
}

module.exports.get_topic_by_name = async(req,res)=>{
    try{
        const topic = await Topic.find({name:req.query.name});
        if(!topic || !topic[0]) throw Error("Topic not found!");
        res.send(topic[0]);
    }catch(e){
        console.log(e.message,e);
        res.send(e.message);
    }
}