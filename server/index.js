const express=require("express");
const dotenv=require("dotenv");
const connection=require("./config/db");
const cors=require("cors");
const userRouter=require("./routes/userRoutes");
const carRouter=require("./routes/carRoutes");
const bodyparser=require("body-parser");
dotenv.config();
const app=express();
const PORT=process.env.PORT;
// app.set("view engine", "ejs")
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(express.json());

app.use("/",userRouter)
app.use("/car",carRouter)

app.listen(PORT,()=>{
    try{
        connection();
      console.log(`Server listening to the ${PORT} `)
    }
    catch(err){
        console.log("Connection Error")

    }
})
