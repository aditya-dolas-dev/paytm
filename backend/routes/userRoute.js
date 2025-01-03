const express = require("express");
const bodyparser = require("body-parser")
const {User, Account}  = require("../db/db")
const router = express.Router();
const app = express();
const zod = require("zod")
const jwt = require("jsonwebtoken");

require('dotenv').config();


const JWT_SECRET = process.env.JWT_SECRET;

const userMiddleWare = require("../middlewares/userMiddleware")
app.use(bodyparser.json());


const signupBody = zod.object({
  username:zod.string().toLowerCase().email(),
  firstname:zod.string(),
  lastname:zod.string(),
  password:zod.string().min(8)
})

const signinBody =zod.object({
  username:zod.string().email(),
  password:zod.string()
})


      {/** SIGNUP PAGE */}
      
router.post("/signup", async function(req,res){
  const {success} = signupBody.safeParse(req.body);

  if(!success){
    res.json({msg:"incorrect input / invalid email / already taken"})
  }

  const existingUser = await User.findOne({ username:req.body.username });
  if (existingUser) {
    return res.status(400).json({ msg: "Username already exists" });
  }


  const user = await User.create({
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    username:req.body.username,
    password:req.body.password,
  })

  const userId = user._id 
  
  const account = Account.create({
    userId,
    balance:1+Math.random()*10000
  })

  const token = jwt.sign({
    userId
}, JWT_SECRET);

res.json({
    message: "User created successfully",
    token: token
})

})


router.post("/signin", async function(req,res){
  const {success} = signinBody.safeParse(req.body);

  if(!success){
    res.json({msg:"incorrect input / invalid email / already taken"})
  }

 const user = await User.findOne({
      username:req.body.username,
      password:req.body.password
  })

  if(user){
    const token = jwt.sign({
     userId:user._id
  }, JWT_SECRET);

  res.json({
      token
  })
  }else{
    res.status(403).json({msg:"Incorrect email or password"})
  }
})


const updateuserBody = zod.object({
  firstname:zod.string().optional(),
  lastname:zod.string().optional(),
  password:zod.string().optional()
})

router.put("/updateuser",userMiddleWare,async function(req,res){
  const {success} = updateuserBody.safeParse(req.body);

   if(!success) {
     res.status(411).json({
        message: "Error while updating information"
     })
    }
  
  await User.updateOne({
    _id:req.userId
  },req.body)
  res.status(200).json({
    message: "Updated successfully"
})

   
})

router.get("/bulksearch", async function(req,res){
  const filter = req.query.filter || "";

  const users = await User.find({
    $or:[{
      firstname:{
        $regex:filter
      },
      lastname:{
        $regex:filter
      }
    }]

  })

  res.json({
    user:users.map(user=>({
      username:user.username,
      firstname:user.firstname,
      lastname:user.lastname,
      _id:user._id
    }))
  })
  })




module.exports = router;

