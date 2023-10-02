const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required."],
        lowercase:true,
        unique:true,
    },
    password:{
        type:String,
        require:[true,"Password is required"],
    },
    subsribed:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"topic",
        default:[],
    },
    is_admin:{
        type:Boolean,
        default:false,
    },
    is_blocked:{
        type:Boolean,
        default:false,
    }
});

userSchema.statics.login = async (email, password) => {
    const user = await User.findOne({ email });
    if (user) {
      const passwordMatched = await bcrypt.compare(password, user.password);
      if (passwordMatched) {
        return user;
      }
      throw Error("Incorrect Password");
    }
    throw Error("This email address does not exist");
};

userSchema.statics.hashPassword = async (password)=>{
    if (password != undefined) {
        const salt = await bcrypt.genSalt();
        password = await bcrypt.hash(password, salt);
        return password;
    }
}

const User = new mongoose.model("user",userSchema);

module.exports = User;