import React from "react";
import { Paper, TextField, Typography} from "@mui/material";
import ResponsiveAppBar from "../Components/AppBar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Components/Usercontext";
import { base_url } from "../Sevices/API";
export default function CreateCar(){
  const {userInfo,setUserInfo} =React.useContext(UserContext);
  const [title, setTitle]=useState("");
  const [price ,setPrice]=useState(0);
  const [content,setContent]=useState("");
  const [file,setFile]=useState("");
  const [color,setColor]=useState("");
  const [mileage,setMileage]=useState("");
   const navigate=useNavigate();
   const postData=(e)=>{
    e.preventDefault();
    // let token=localStorage.getItem('token')||"";
    console.log(userInfo.id);
      const data=new FormData();
      data.set('title',title);
      data.set('price',price);
      data.set('color',color);
      data.set('mileage',mileage);
      for (let i = 0; i < file.length; i++) {
        data.append('file[]', file[i]);
     }
      
      data.set('discription',content);
      data.set('id',userInfo.id);
  
      console.log(file[0]);
      fetch(`${base_url}/post`,{
        method:"POST",
         body:data,
       

      })
      .then((res)=>{
        console.log(res);
        alert("Created Succesfully");
        navigate("/");
         
      })
      .catch((err)=>{
        console.log(err)
        alert("Please Enter Required Field");
      })
   }
    const inputstyle={
      
        width:"80%",
        margin:"auto",
        height:"5px",
        marginTop:"40px",
        marginBottom:"40px"
      

    }
    const paperStyle={
        width:"50%",
        height:"110vh",
        margin:"auto",
        marginTop:"30px",
        display:"flex",
        alignItems:"center",
        justifiedContent:"center",
        textAlign:"center"

    }
    const modules = {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link'],
          ['clean'],
        ],
      };

    return <>
    <ResponsiveAppBar/>
    <Paper elevation={20} style={paperStyle}>
        <form style={{width:"100%",height:"100%"}} onSubmit={postData}>
            <Typography style={{fontSize:"30px",fontWeight:"bold",marginTop:"20px"}}>SELL YOUR CAR</Typography>
            <TextField
    required
    id="outlined-required"
    type="title"
    label="Tiltle"
    name="title"
    value={title}
    autoFocus
    onChange={(e)=>setTitle(e.target.value)}
    placeholder="Title"
    style={inputstyle} 
  />
     
         <TextField
    required
    id="outlined-required"
    type="file"
    name="file"
    inputProps={{
      multiple: true
    }}

  onChange={(e)=>setFile(e.target.files)}
  
   style={inputstyle} 
  />
      <TextField
    required
    id="outlined-required"
    type="Price"
    label="Price"
    name="price"
    value={price}
    onChange={(e)=>setPrice(e.target.value)}
    placeholder="Car Price"
    style={inputstyle} 
  />
      <TextField
    required
    id="outlined-required"
    type="summary"
    label="Color"
    name="color"
    value={color}
    onChange={(e)=>setColor(e.target.value)}
    placeholder="Car Color"
    style={inputstyle} 
  />
      <TextField
    required
    id="outlined-required"
    type="summary"
    label="Mileage"
    name="mileage"
    value={mileage}
    onChange={(e)=>setMileage(e.target.value)}
    placeholder="Mileage"
    style={inputstyle} 
  />
          <ReactQuill value={content} onChange={newValue=>setContent(newValue)} style={{width:"90%",margin:"auto",marginTop:"30px"}} modules={modules}/>
          <button  style={{width:"90%",margin:"auto",backgroundColor:"grey",height:"50px",marginTop:"20px",color:"white",fontSize:"30px"}}>SUBMIT</button>
        </form>
    </Paper>


    </>
    
}
