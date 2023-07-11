import React, { useState } from 'react'
import "../App.css";
import { base_url } from '../Sevices/API';
import { store } from '../Redux/store';
import { getData } from '../Redux/actions';

export default function Filter() {
    // const [filter, setFilter] = useState("");



    const resetData=()=>{
        fetch(`${base_url}/cars`)
        .then((res)=>res.json())
        .then((json)=>{store.dispatch(getData(json))})
        .catch((err)=>console.log("Error"));

    }



   

   
    return (
        <>
            <div className='container-fluid filtero' style={{marginTop:"20px"}}>
                <div className='heading'>
                    <h2>Filters</h2>
                    {/* <p><a href="#" onClick={reset}>RESET</a></p> */}
                    <p><button className='reset' onClick={resetData} style={{cursor:"pointer"}}>RESET</button></p>

                </div>
                <br />
              
               

                {/* <button>Filter Data</button> */}
                <div>
                  
                 

                    {/* Filter boxes Starts here */}
                    <p>By Mileage</p>
                    <div className='FilterBox'>


                        {/* Kmps below */}
                        <div>
                            <button className='btn'>
                                <i class="fa-solid fa-road"></i><br />
                                <p> Km 40 <i class="fa-sharp fa-solid fa-arrow-down"></i></p>  </button>
                        </div>
                        <div>
                            <button className='btn' >
                                <i class="fa-solid fa-road"></i><br />
                                <p> Km 40 <i class="fa-sharp fa-solid fa-arrow-up"></i></p>  </button>
                        </div>
                        {/* High to low price */}
                        


                       

                    </div>
                    <hr style={{ border: "1px solid grey" }} />

                     <p>By Price</p>
                    <div className='FilterBox'>
                        {/* Kmps above */}
                        <div>
                            <button className='btn' >
                                <i class="fa-sharp fa-solid fa-arrow-up"></i>
                                <i class="fa-solid fa-indian-rupee-sign"></i> <br />
                                <p> High to Low </p>
                            </button>
                        </div>


                        {/* low to high price */}
                        <div>
                            <button className='btn' >
                                <i class="fa-sharp fa-solid fa-arrow-down"></i>
                                <i class="fa-solid fa-indian-rupee-sign"></i> <br />
                                <p> Low to High </p>
                            </button>
                        </div>


                       



                    </div>


                </div>


                <hr style={{ border: "1px solid grey" }} />

                <p>By Color</p>
                <div className='ColorBox'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <hr style={{ border: "1px solid grey" }} />
               

            </div>
        </>
    )
}