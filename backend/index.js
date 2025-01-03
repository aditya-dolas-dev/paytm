const express = require("express")
const bodyparser = require("body-parser")
const app = express();
const mainRouter = require("./routes/index");
const cors =require("cors")

const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(bodyparser.json())
app.use("/api/v1", mainRouter);


app.listen(PORT , function(){
  console.log(`port is connected on ${PORT}`)
})