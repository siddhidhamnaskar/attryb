import { useEffect, useState } from "react";
import "../App.css";
import Card from "../Components/Card";
import { base_url } from "../Sevices/API";
import { UserContext } from "../Components/Usercontext";
import { useContext } from "react";
import ResponsiveAppBar from "../Components/AppBar";

export default function MyCars(){
    const {userInfo,setUserInfo} =useContext(UserContext);
    const [data,setData]=useState([]);

    useEffect(()=>{
        var token=localStorage.getItem('token')||"";

        fetch(`${base_url}/user/profile`,{
            method:"post",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({'token':token}),
         
       
           })
           .then((res)=>{
              res.json().then((info)=>{
                 
               setUserInfo(info);
               fetch(`${base_url}/myCars/?Author=${info.id}`)
               .then((res)=>{
                 return res.json();

                 })
                 .then((json)=>{
                    console.log(json)
                    
                   setData(json)
                //    setLoad(false)
                 })
                })
           })
    },[])





    return <>
    <ResponsiveAppBar/>

<div id="cardcontainer" style={{width:"100%",height:"200vh",display:"flex",justifyContent:"center"}}>
     
    
     {data.map((elem)=>{
    
        return <Card key={elem._id} {...elem}/>
       

    })}
       
        
  
 
  </div>
    
    
    
    </>
}