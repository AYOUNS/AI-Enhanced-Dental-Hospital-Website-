import React from 'react'
import { Navigate, Route, useNavigate} from 'react-router'
// import { Route  } from 'react-router';
export default function ProtectedRoute(props) {
// const navigate=useNavigate()
    
if(localStorage.getItem("userData")){

    if(JSON.parse(localStorage.getItem("userData")).role ==='user'){
        return props.children
    }
    else{
        return <Navigate to="/login"/> 
    }
}
    else {
        return <Navigate to="/login"/> 
    }


}
