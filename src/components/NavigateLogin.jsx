import React, { useContext } from "react";
import { AlertContext, CreateUser } from "../App";
import { Navigate } from "react-router-dom";
import  SignUp  from "./SignUpPage";
import Forgot from "./ForgotPage";
import Home from "./Home";
import Detail from "./ProductDetail";
import cart from "./Cart";
function NavigateHOC(IncomingComponent){

    return(({...props})=>{
        const {user} = useContext(CreateUser);
        if(!user){
            return <Navigate to="/login"/>
        }
        return (
            <IncomingComponent {...props}/>
        )
    })
}
export default NavigateHOC(Home);
export const DetaiL = NavigateHOC(Detail);
export const CarT = NavigateHOC(cart);