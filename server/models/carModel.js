

const mongoose=require("mongoose");
const {Schema}=require("mongoose");
const carSchema=new mongoose.Schema({
    
   
    Title:{type:String,required:true},
    Price:{type:Number,required:true},
    // Color:{type:String,required:true},
    // Mileage:{type:Number,required:true},
    // Discription:{type:String},
   
},{
    timestamps:true
})

const carModel=mongoose.model("car",carSchema);

module.exports=carModel