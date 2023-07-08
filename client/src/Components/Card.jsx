import React from "react"
import "../App.css";
import { Link } from "react-router-dom";
import { UserContext } from "./Usercontext";

export default function Card({Title,Image,Price,Color,Mileage,Discription,_id,Author}){

    const {userInfo,setUserInfo} =React.useContext(UserContext);

    return <>
        <div className='container-fluid mainCars'>
                            <div className='row'>
                                <div className='col-md-8'>
                                    <div className='carImage col-md-6'>
                                        <img src={Image} alt="cars" />
                                    </div>

                                    <div className='carContent col-md-6'>
                                        <h1>{Title}</h1>
                                        {/* <div className='flex'>
                                            <p>{e.trans} .</p>
                                            <p>{e.fuel} .</p>
                                            <p>{e.seat} seats</p>
                                        </div> */}

                                        <div className='rating'>
                                            <i class="fa-solid fa-star"></i>
                                            {/* <p>{e.rating}. </p> */}
                                            <p>{Mileage} Kms Driven</p>

                                        </div>

                                        <p><i class="fa-sharp fa-solid fa-car-side"></i> Terminal Delivery Available</p>
                                    </div>
                                    <div className='col-md-4 pricetag'>
                                    {/* <img src={e.image_url} alt="" /> */}
                                    <h2>$ {Price}</h2>
                                    <p>$ 5789</p>
                                    
                                </div>
                                </div>
                                {userInfo._id===Author.id ? 
                                <div className="updateButtons">
                                    <Link to={`./edit/${_id}`}>Edit</Link>
                                    <Link>Delete</Link>
                                </div>:null}

                               

                            </div>
                        </div>
                    
                
    
    
    </>
}