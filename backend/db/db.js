const mongoose = require("mongoose");
require('dotenv').config();

const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL)


const userSchema = new mongoose.Schema ({

  username:{
   type:String,
   required:true,
   unique:true,
  },
  firstname:{
    type:String,
    required:true
  },
  lastname:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
})

const accountSchema = new mongoose.Schema({
  userId:{
   type:mongoose.Schema.Types.ObjectId,
   ref:'User',
   required:true
  },
  balance:{
    type:Number,
    required:true,
  }
})

const User = mongoose.model("User", userSchema)
const Account = mongoose.model('account',accountSchema)

module.exports={User,Account};