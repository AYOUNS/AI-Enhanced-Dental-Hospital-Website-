import React from 'react'
import {  Link, Navigate, useNavigate } from "react-router-dom";
export default function AdminRoute(props) {
    const navigate=useNavigate()
    if(localStorage.getItem("userData")){

        if(JSON.parse(localStorage.getItem("userData")).role ==='admin'){
            return props.children
        }
    }
 
    else {

   return <Navigate to="/login"/>  
    }
}
