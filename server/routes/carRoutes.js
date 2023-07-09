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

  const upload = multer({ storage: storage});



carRouter.get("/cars",async(req,res)=>{

    try{
    
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



  

// carRouter.post("/post",upload.array('file[]',2),async(req,res)=>{
//     try{
      
      
//        const urls=[];
//        const files=req.files;
       
//        for(const file of files)
//        {
//         console.log(1);
//          const {path}=file;
//          const res=await cloudinary.uploader.upload(path)
//          // console.log(res.secure_url);
//          urls.push(res.secure_url);
//          // console.log(urls[0]);
//           fs.unlinkSync(path);

//        }
      
        
      

//         const car=new cars({
//             Image:urls[0],
//             Title:req.body.title,
//             Price:req.body.price,
//             Color:req.body.color,
//             Mileage:req.body.mileage,
//             Discription:req.body.discription,
//             Author:req.body.id
//            })
//           const Cars=await car.save();
//           res.status(200).json(Cars);
        
//     }
//     catch(err){
//       console.log(2);
//         res.status(505).json(err)
//     }

    
// })

carRouter.post("/post",upload.array('file[]',50),async(req,res)=>{
  try{
    

       const urls=[];
      const files=req.files;
      
      for(const file of files)
      {
        const {path}=file;
        const res=await cloudinary.uploader.upload(path)
        // console.log(res.secure_url);
        urls.push(res.secure_url);
        // console.log(urls[0]);
         fs.unlinkSync(path);

      }
       
       
    
      
   

      // console.log(urls);
      
      const car=new cars({
        Image:urls[0],
        Title:req.body.title,
        Price:req.body.price,
        Color:req.body.color,
        Mileage:req.body.mileage,
        Discription:req.body.discription,
        Author:req.body.id
       })
      const Cars=await car.save();
      res.status(200).json(Cars);
  }
  catch(err){

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
        const Cars=await cars.find().sort({createdAt:-1})
        res.status(200).json(Cars)
       

    }
    catch(err){
        res.status(505).json(err)

    }
  })


  
  module.exports=carRouter;

