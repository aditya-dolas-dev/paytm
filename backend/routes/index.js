const express = require("express");
const userRouter = require("./userRoute");
const accountRouter = require("../routes/accountRoute")
const router = express.Router();


router.use("/user", userRouter )
router.use("/account", accountRouter)

module.exports =router;