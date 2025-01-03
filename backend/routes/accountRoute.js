const express = require('express');
const userMiddleWare = require('../middlewares/userMiddleware');
const { Account } = require('../db/db');
const mongooose = require("mongoose")

const router = express.Router();



router.get("/balance",userMiddleWare,async function(req,res){

  const account = await Account.findOne({
    userId:req.userId
  }) 
   res.json({balance:account.balance})
})


router.post('/transferfunds',userMiddleWare,async function(req,res){
  const session = await mongooose.startSession();

  session.startTransaction();

  const {amount , receiver} = req.body;

  // fetch the accounts within the transaction 

  const accountSender = await Account.findOne({
     userId:req.userId
  }).session(session);

  if(!accountSender || accountSender.balance < amount) { 
    await session.abortTransaction();
    return res.status(403).json({msg:"insuffucient balance"})
  }

  const accountReciver = await Account.findOne({
    userId:receiver
  }).session(session);

  if(!accountReciver){
    await session.abortTransaction();
    res.status(403).json({msg:"invalid account"});
  }
 

  // perform the transfer 

  await Account.updateOne({userId:req.userId},{$inc: {balance: -amount}}).session(session);
  await Account.updateOne({userId:receiver},{$inc : {balance : amount}}).session(session);


  // commit the transaction 

  await session.commitTransaction();
  res.json({msg:"transaction successful"})
  

})


module.exports = router;