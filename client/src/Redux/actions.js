import {GETDATA} from "./actionsTypes"


const getData=(payload)=>{
    return{
        type:GETDATA,
        payload
    }
}



export {getData}