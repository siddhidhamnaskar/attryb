import { createContext, useState } from "react";


export const UserContext=createContext({Email:"",Name:"",id:""});

export function UserContextProvider({children}){
      const [userInfo,setUserInfo]=useState({Email:"",Name:"",id:""});
      const [loader,setLoader]=useState(true);
      
      return (
        <UserContext.Provider value={{userInfo,setUserInfo,loader,setLoader}}>
        {children}
        </UserContext.Provider>
      );

}