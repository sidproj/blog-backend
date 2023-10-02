const Article = require("../models/article");
const Topic = require("../models/topic");
const User = require("../models/user");

module.exports.get_latest_articles = async (req,res)=>{
    try{
        const articles = await Article.find().populate("topic").sort({"date":-1}).limit(5);

        res.send(articles);
    }catch(e){
        console.log(e);
        res.send(e.message);
    }
}

module.exports.get_articles_by_topic_name = async (req,res)=>{
    try{
        console.log(req.params);
        const topic = await Topic.find({name:req.params.id});
        if(!topic || !topic[0]) throw Error("No topic found!");
        const articles = await Article.find({topic:topic[0]._id}).populate("topic");
        res.send(articles);
    }catch(e){
        console.log(e);
        res.send(e.message);
    }
}

module.exports.get_articles_by_topic_id = async (req,res)=>{
    try{
        console.log(req.params);

        const topic = await Topic.findById(req.params.id);
        console.log(topic);
        if(!topic) throw Error("No topic found!");
        const articles = await Article.find({topic:topic._id}).populate("topic");
        res.send(articles);
    }catch(e){
        console.log(e);
        res.send(e.message);
    }
}

module.exports.get_articles_by_id = async (req,res)=>{
    try{
        const article = await Article.findById(req.params.id).populate("topic");
        if(!article)throw Error("No article found.");
        res.send(article);
    }catch(e){
        console.log(e);
        res.send(e.meesage);
    }
}

module.exports.post_add_user_comments = async (req,res)=>{
    try{
        const user = await User.findById(res.user.id);
        if(!user) throw Error("User not found.");

        const article = await Article.findById(req.body.article_id);
        if(!article) throw Error("No article found.");

        article.comments.push({
            user:res.user.id,
            name:user.email,
            text:req.body.comment
        });
        
        await article.save();

        res.send(article);
    }catch(e){
        console.log(e);
        res.send(e.message);
    }
}

module.exports.post_remove_user_comments = async (req,res)=>{
    try{
        const user = await User.findById(res.user.id);
        if(!user) throw Error("User not found.");

        const article = await Article.findById(req.body.article_id);
        if(!article) throw Error("No article found.");

        let comment = null;
        const comments = [];

        for(let i =0;i<article.comments.length;i++){
            if(req.body.comment_id == article.comments[i]._id){
                comment = article.comments[i];
            }else{
                comments.push(article.comments[i]);
            }
        }

        if(!comment) throw Error("Comment not found.");
        if(comment.user != res.user.id) throw Error("User not authorized.")

        
        article.comments = comments;

        console.log(article);
        
        await article.save();

        res.send(article);
    }catch(e){
        console.log(e);
        res.send(e.message);
    }
}