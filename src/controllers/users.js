const User = require("../models/user");
const jwt = require("jsonwebtoken");


const createJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};

module.exports.login_post = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.login(email,password);
        const jwttoken = createJWT(user._id);
        const newUser = {
            email : user.email,
            subsribed: user.subsribed,
        }
        res.send({user:newUser,jwt:jwttoken});
    }catch(e){
        console.log(e);
        res.send({error:e.message});
    }
}

module.exports.register_post = async (req,res)=>{
    const {email,password,conf_password} = req.body;

    try{
        if(password != conf_password) throw Error("Passwords do not match!");

        const user = User({
            email:email
        })
        user.password = await User.hashPassword(password);

        await user.save();
        const newUser = {
            email : user.email,
            subsribed: user.subsribed,
        }
        const jwttoken = createJWT(user._id);
        res.send({user:newUser,jwt:jwttoken});

    }catch(e){
        console.log(e);
        res.send({error:e.message});
    }

}

module.exports.add_subscription = async (req,res)=>{
    try{
        const user =await User.findById(res.user.id);
        
        if(!user.subsribed.includes(req.body.topic_id))
        user.subsribed.push(req.body.topic_id);
        
        await user.save();

        const newUser = {
            email : user.email,
            subsribed: user.subsribed,
        }

        res.send({user:newUser});
    }catch(e){
        console.log(e);
        res.send({error:e.message});
    }
}

module.exports.remove_subscription = async (req,res)=>{
    try{
        const user = await User.findById(res.user.id);
        user.subsribed.pull(req.body.topic_id);
        
        await user.save();
        
        const newUser = {
            email : user.email,
            subsribed: user.subsribed,
        }

        res.send({user:newUser});
    }catch(e){
        console.log(e);
        res.send({error:e.message});
    }
}