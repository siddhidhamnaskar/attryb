const cars=require("../models/carModel")

const router=require("express");
const carRouter=router();
const fs =require('fs');

const dotenv=require("dotenv");
dotenv.config();
const cloudinary=require("cloudinary");

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET

})

const upload=require('../ImageUpload/multer')



carRouter.get("/",async(req,res)=>{

    try{
      console.log(1);
        const car=await cars.find().sort({createdAt:-1}).limit(10)
        res.status(200).json(car)

    }
    catch(err){
       res.status(505).json(err)
    }

})

carRouter.get("/car/:id",async(req,res)=>{
    try{
      const car=await cars.findById(req.params.id)
      res.status(200).json(car)
  
    }
    catch(err){
      res.status(505).json(err);
    }
  })



  

carRouter.post("/post",upload.array('file[]',2),async(req,res)=>{
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
          //  fs.unlinkSync(path);

        }
         
         
      
        
     

        // console.log(urls);
        const post=new cars({
          Image:urls[0],
          Title:req.body.title,
          Price:req.body.price,
          Color:req.body.color,
          Mileage:req.body.mileage,
          Discription:req.body.discription,
          Author:req.body.id
          
          })
          const Cars=await post.save();
          res.status(200).json(Cars);
    }
    catch(err){

        res.status(505).json(err)
    }

    
})

carRouter.put("/edit/:id",upload.array('file[]',2),async(req,res)=>{
    try{
      const car=await cars.findById(req.params.id)
       car.Title=req.body.title;
       car.Price=req.body.price;
       car.Color=req.body.Color;
       car.Mileage=req.body.mileage;
       car.Discription=req.body.discription;
       if(req.files)
       {
        const urls=[];
        const files=req.files;
        
        for(const file of files)
        {
          const {path}=file;
          const res=await cloudinary.uploader.upload(path)
          //  console.log(res.secure_url);
          urls.push(res.secure_url);
          // console.log(urls[0]);
           fs.unlinkSync(path);

        }
        blog.img=urls[0]
  
       }
  
  
       const Car=await car.save();
       res.status(200).json(Car);
  
  
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


  carRouter.get("/myCars/",async(req,res)=>{
    try{
      //  console.log(req.query);
      const carData=await cars.find(req.query).sort({createdAt:-1}).limit(20);
      // console.log(carData);
      res.status(200).json(carData);
  
    }
    catch(err){
      res.status(505).json(err);
    }
  })

  carRouter.get("/below40",async(req,res)=>{
    try{

      const Cars=await cars.find().sort({createdAt:-1});

      const filterData=Cars.filter((elem)=>{
        return elem.Mileage <=40;
         
      })
      res.status(200).json(filterData)

    }
    catch(err){
      res.status(505).json(err);
    }
  })

  carRouter.get("/above40",async(req,res)=>{
    try{

      const Cars=await cars.find().sort({createdAt:-1});

      const filterData=Cars.filter((elem)=>{
        return elem.Mileage >=40;
         
      })
      res.status(200).json(filterData)

    }
    catch(err){
      res.status(505).json(err);
    }
  })

  carRouter.get("/htl",async(req,res)=>{
    try{

      const Cars=await cars.find();
      const sortData=Cars.sort((a,b)=>{
        return b.Price-a.Price
      })

      res.status(200).json(sortData);

    }
    catch(err){
      res.status(505).json(err);

    }
  })

  carRouter.get("/lth",async(req,res)=>{
    try{

      const Cars=await cars.find();
      const sortData=Cars.sort((a,b)=>{
        return a.Price-b.Price
      })

      res.status(200).json(sortData);

    }
    catch(err){
      res.status(505).json(err);

    }
  })


  carRouter.get('/byColor/',async(req,res)=>{
    try{
      const carData=await cars.find(req.query).sort({createdAt:-1});
      res.status(200).json(carData);

    }
    catch(err){
      res.status(505).json(err);

    }
  })
  
  module.exports=carRouter;

