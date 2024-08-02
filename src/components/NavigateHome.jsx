import React, { useContext } from "react";
import { AlertContext, CreateUser } from "../App";
import { Navigate } from "react-router-dom";
import  Login  from "./SignInPage";
import  SignUp  from "./SignUpPage";
import Forgot from "./ForgotPage";
function NavigateHOC(IncomingComponent){

    return(()=>{
        const {user,setUser} = useContext(CreateUser);
        const {alert,setAlert} = useContext(AlertContext);
        if(user){
            return <Navigate to="/"/>
        }
        return (
            <IncomingComponent setUser={setUser} setAlert={setAlert} />
        )
    })
}
export default NavigateHOC(Login);
export const SignUP = NavigateHOC(SignUp);
export const ForgoT = NavigateHOC(Forgot);