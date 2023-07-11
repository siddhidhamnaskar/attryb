const express =require("express");
const dotenv=require('dotenv');
const cors=require("cors");
dotenv.config();
const app=express();
const userRouter=require("./routes/userRoutes")
const carRouter=require("./routes/carRoutes")
const connection=require("./config/db")
// const server=require("http").createServer(app);
const bodyparser=require("body-parser");
//  const io=require('socket.io')(server,{cors:{origin:'*'}})

 app.set("view engine", "ejs")
 
// Body-parser middleware




const PORT=process.env.PORT;

 app.use(cors());
 app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
 

 app.use(express.json());
 app.use('/',userRouter)

app.use("/car",carRouter)
app.listen(PORT,()=>{
    try{
        connection();
        console.log(`server running on ${PORT}`);
    }
    catch(err){
        console.log("Connection Failed");
    }
})
