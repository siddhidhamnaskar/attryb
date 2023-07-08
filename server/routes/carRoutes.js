const cars=require("../models/carModel")
const multer=require('multer');
const router=require("express");


const carRouter=router();
const fs =require('fs');
const jwt=require('jsonwebtoken');

const dotenv=require("dotenv");
dotenv.config();
const secret=process.env.SECRET;
const cloudinary=require("cloudinary");

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET

})



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  


  const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png')
    {
        cb(null,true)
    }
    else
    {
        cb({message:"Unsuported File Format"},false)
    }
  }

  const upload = multer({ storage: storage, fileFilter:fileFilter });



carRouter.get("/cars",async(req,res)=>{

    try{
      console.log(1);
        const car=await cars.find().sort({createdAt:-1})
        res.status(200).json(car)

    }
    catch(err){
       res.status(505).json(err)
    }

})

carRouter.get("/cars/:id",async(req,res)=>{
    try{
      const car=await cars.findById(req.params.id)
      res.status(200).json(car)
  
    }
    catch(err){
      res.status(505).json(err);
    }
  })



  

carRouter.post("/post",upload.single('file'),async(req,res)=>{
    try{
      

      
       
        
  
        
         
         
      
        
           let token=req.body.token;
       jwt.verify(token ,secret,{},async(err,info)=>{
            if(err) throw err;
        // console.log(urls);
        
        const {path}=req.file
        const result=await cloudinary.uploader.upload(path)
   
        const url=result.secure_url;
   
         fs.unlinkSync(path);

        const car=new cars({
            Image:url,
            Title:req.body.title,
            Price:req.body.price,
            Color:req.body.color,
            Mileage:req.body.mileage,
            Discription:req.body.discription,
            Author:info.id
           })
          const Cars=await car.save();
          res.status(200).json(Cars);
        })
    }
    catch(err){
      console.log(2);
        res.status(505).json(err)
    }

    
})

carRouter.put("/edit/:id",upload.single('file'),async(req,res)=>{
    try{
      const car=await cars.findById(req.params.id)
       car.Title=req.body.title;
       car.Price=req.body.price;
       car.Color=req.body.color;
       car.Mileage=req.body.mileage;
       car.Discription=req.body.discription;
       if(req.file)
       {
     
        
        
      
          const {path}=req.file;
          const res=await cloudinary.uploader.upload(path)
         
          const url=res.secure_url
      
           fs.unlinkSync(path);

        
        car.Image=url
  
       }
  
  
       const post=await car.save();
       res.status(200).json(post);
  
  
    }
    catch(err){
        res.status(505).json(err)
  
    }
  
  })

  carRouter.delete("/delete/:id",async(req,res)=>{
    try{

        const car=await cars.findByIdAndDelete(req.params.id);
        res.status(200).json(car);

    }
    catch(err){
        res.status(505).json(err)

    }
  })


  
  module.exports=carRouter;

