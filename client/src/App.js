import logo from './logo.svg';
import './App.css';
import ResponsiveAppBar from './Components/AppBar';
import CircularIndeterminate from './Components/Loader';
import LinearProgress from '@mui/material/LinearProgress';
import Card from './Components/Card';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { base_url } from './Sevices/API';
import { store } from './Redux/store';
import {getData} from "./Redux/actions"
import Filter from './Components/Filters';
import { UserContext } from './Components/Usercontext';

export default function App() {
  const {loader,setLoader}=useContext(UserContext)
  const [data ,setData]=useState([]);
  const [load,setLoad]=useState(true);

  store.subscribe(()=>{
     console.log(store.getState().data);
    setData(store.getState().data)
    setLoad(false)
    setLoader(false)
  })
    
  useEffect(()=>{
    fetch(`${base_url}/cars`)
    .then((res)=>res.json())
    .then((json)=>{store.dispatch(getData(json))})
    .catch((err)=>console.log("Error"));
  },[])
      

  
  return <>
    <ResponsiveAppBar />
    {loader ? <LinearProgress/>:null}
    <div id='Container'>
    <Filter/> 

      {load ? <CircularIndeterminate/>:<> <div id="cardcontainer">
     
    
      {data.map((elem)=>{
     
         return <Card key={elem._id} {...elem}/>
        

     })}

     {data.length==0 ? <p>No Results Found</p>:null}
        
         
   
  
   </div></>}
    </div>
  
   
  </>
}



