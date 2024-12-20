const mongoose = require("mongoose");




mongoose.connect("mongodb+srv://themadtitan08:Adityadolas12@cluster0.op4qt.mongodb.net/PaytmDatabase")


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