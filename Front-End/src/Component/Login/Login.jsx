import React from 'react'
import "./login.css"
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
export default function Login() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
 const navigate=useNavigate()
  function HandleLogin(e){
    e.preventDefault()
    let userData=JSON.stringify({email:email,password:password})
   
window.localStorage.setItem("userData",userData)
 
console.log(userData);
navigate("/")

  }
  return (

    <div className="login vh-100  ">
        <div className="container d-flex   justify-content-center align-items-center h-100">
            <div className="block text-center py-4 px-4">

            <h2>Welcome Back</h2>
            <form action="" className='d-flex flex-column' onSubmit={HandleLogin}>

            <input onChange={(e)=>setEmail(e.target.value)}  type="email" className= '  d-block  my-4 px-5 py-3 inp' name="email" id="email" placeholder='Email' />
            <input onChange={(e)=>setPassword(e.target.value)}  type="password" className=' d-block  my-4 px-5 py-3 inp' name="password" id="password" placeholder='Password' />
            <button type='submit'  className='my-3'>Log in</button>
            </form>
            {/* <a href='/' className='px-3 mt-2 mx-2 w-25  '>sign up</a>
            <a href='/' className='px-3 mt-2 mx-2  w-50  '>forgot password</a> */}
            </div>
        </div>
    </div>
  )
}
