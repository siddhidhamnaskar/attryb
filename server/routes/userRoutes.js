
const router=require('express')
const User=require('../models/userModel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
const secret=process.env.SECRET;

const userRouter=router();
userRouter.post("/signup",async(req,res)=>{
  try{
      const salt=await bcrypt.genSalt(8);
      const hashPass=await bcrypt.hash(req.body.Password,salt);
      const newUser=new User({
        Name:req.body.Name,
        Email:req.body.Email,
        Password:hashPass
        

          
      });
      const user= await newUser.save();
      // console.log(user);
      res.status(200).json(user);

   }
   catch(err){
    res.status(500).json(err);
      
   }

 
})

userRouter.post("/login",async(req,res)=>{
  try{
      const user=await User.findOne({Email:req.body.Email});
  
      !user && res.status(400).json("Wrong Credintials");
  
      const validate=await bcrypt.compare(req.body.Password,user.Password);

     if(validate)
     {
      jwt.sign({Name:user.Name,Email:user.Email,id:user._id},secret,{ expiresIn: "1h" },(err,token)=>{
          if(err) throw err;
         
          
          res.status(200).json(token)
      
      })
     }
     else{
       res.status(400).json("Incorrect Password");
     }

    
  

    }
    catch(err)
    {
      res.status(500).json(err);
 
    }
})

userRouter.post('/profile',async(req,res)=>{
try{
  let token=req.body.token;
  jwt.verify(token ,secret,{},(err,info)=>{
      if(err) throw err;
      res.json(info);

  })
}
catch(err){
  res.status(500).json(err);
}
 

})




module.exports=userRouter