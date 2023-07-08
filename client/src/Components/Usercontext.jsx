import { createContext, useState } from "react";


export const UserContext=createContext({Email:"",Name:"",id:""});

export function UserContextProvider({children}){
      const [userInfo,setUserInfo]=useState({Email:"",Name:"",id:""});
      const [image,setImage]=useState()

      return (
        <UserContext.Provider value={{userInfo,setUserInfo}}>
        {children}
        </UserContext.Provider>
      );

}