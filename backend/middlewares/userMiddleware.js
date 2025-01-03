const jwt = require("jsonwebtoken")
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;



function userMiddleWare(req,res,next){

  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith('Bearer')){
    res.status(403).json({msg:"invalid token"})
  }
  const words = authHeader.split(" ");
  const jwtToken = words[1];
  
  try{
  const decodedValue = jwt.verify(jwtToken,JWT_SECRET);
  if(decodedValue){
    req.userId = decodedValue.userId
    next()
  }
}catch(error){
  return res.status(403).json({})
}

}

module.exports=userMiddleWare;