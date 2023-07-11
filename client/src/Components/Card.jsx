import React from "react"
import "../App.css";
import { Link } from "react-router-dom";
import { UserContext } from "./Usercontext";
import { base_url } from "../Sevices/API";
import { useNavigate } from "react-router-dom";
import { store } from "../Redux/store";
import { getData } from "../Redux/actions";

export default function Card({Title,Image,Price,Color,Mileage,Discription,_id,Author}){

    const {userInfo,setUserInfo} =React.useContext(UserContext);
    const navigate=useNavigate();
    const deleteCar=(id)=>{
        fetch(`${base_url}/delete/${id}`,{
            method:"DELETE"
        })
        .then((res)=>{
            return res.json();
        })
        .then((json)=>{
            store.dispatch(getData(json))
            alert("Deleted Succesfully");
            

        })
        
    }

    return <>
        <div className='container-fluid mainCars'>
                            <div className='row'>
                                <div className='col-md-8'>
                                    <div className='carImage col-md-6'>
                                        <img src={Image} alt="cars" />
                                    </div>

                                    <div className='carContent col-md-6'>
                                  <h1>{Title}</h1>
                                      

                                        <div className='rating'>
                                            <i class="fa-solid fa-star">  </i>
                                            <p>{Mileage} Kms Driven</p>

                                        </div>

                                        <p><i class="fa-sharp fa-solid fa-car-side"></i> Terminal Delivery Available</p>
                                    </div>
                                    <div className='col-md-4 pricetag'>
                               
                                    <h2>$ {Price}</h2>
                                    <p>$ 5789</p>
                                    
                                </div>
                                </div>
                                {userInfo.id===Author.id ? 
                                null:<div className="updateButtons">
                                <Link to={`./edit/${_id}`}>Edit</Link>
                                <p style={{marginTop:"-1px",color:"blue",textDecoration:"underline",cursor:"pointer"}} onClick={()=>deleteCar(_id)}>Delete</p>
                            </div>}

                               

                            </div>
                        </div>
                    
                
    
    
    </>
}