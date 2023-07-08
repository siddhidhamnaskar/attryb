import { Route, Routes } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login";
import Signup from "../Pages/SignUp";
import CreateCar from "../Pages/CreateCar";
import Details from "../Pages/Details";
import EditCar from "../Pages/EditCar";
import MyCars from "../Pages/MyCars";
export default function Allroutes(){
    return <>
    <Routes>
        <Route path="/" element={<App/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/sellcar" element={<CreateCar/>}></Route>
        <Route path="/details/:id" element={<Details/>}></Route>
        <Route path="/edit/:id" element={<EditCar/>}></Route>
        <Route path="/myCars" element={<MyCars/>}></Route>

    </Routes>
    </>
}