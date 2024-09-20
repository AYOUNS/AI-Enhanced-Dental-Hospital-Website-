import React, { useEffect } from 'react'
// import "./login.css"
import Alert from 'react-bootstrap/Alert';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react'
import Joi, { x } from 'joi';
export default function Log({setUser,setAdmin,setDoctor,setRole,setToken}) {
  const [email,setEmail]=useState("")
  const [loader,setLoader]=useState(false)
  const [password,setPassword]=useState("")
  const [error,setError]=useState("")
  const [errorList,setErrorList]=useState([])
 const navigate=useNavigate()






  function handelValidation(e){
const schema=Joi.object({
email:Joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}).required(),
password:Joi.string().min(8)
 
})
return schema.validate({email,password},{abortEarly:false})
 }
 async function  HandleLogin  (e){
   e.preventDefault()
   setLoader(true)
   setError("")
   setErrorList("")
    let validation=handelValidation()
    if(!validation.error){

      const url = new URL(
        "https://aidoctortest.visooft-code.com/api/auth/login"
    );
    
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
    
    let body = {
      "email":email,
        "password": password,
    };
    
   let response= await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    }).then(response => response.json());

    console.log(response);
 

  if(response.code===200){
    // localStorage.setItem("userData", JSON.stringify(response.data))
    localStorage.setItem("token", JSON.stringify(response.data.token))
    setRole(response.data.role)
    setUser(response.data)
    // setToken(response.data.token)
    navigate('/')
  }
  else{
   setError(response.message)
  }
    }
    else{
      setErrorList(validation.error.details )
    }

    setLoader(false)

    //  let userData=  JSON.stringify({email:email,password:password})
   
  // window.localStorage.setItem("userData",userData)
 /*
  if(email==="admin@admin.com"&&password==="admin")
  {
    setAdmin({email:email,password:password})
    console.log("aaaaaa");
    navigate("/")
  }
  if(email==="doctor@doctor.com"&&password==="doctor")
  {
    setDoctor({email:email,password:password})
    console.log("setDoctorsetDoctor");
    navigate("/")
  }
  if(localStorage.getItem("userData")){

    const emaill=JSON.parse(localStorage.getItem("userData")).email;
    const passwordd=JSON.parse(localStorage.getItem("userData")).password;
    console.log(emaill,email);
    console.log(passwordd,password);
    if(emaill===email&&passwordd===password)
    {
   
    setUser({email:email,password:password})
      navigate("/")
   
    }
    else{
     console.log("wrong");
    }
  }
*/

  }
  

  return <>
    <div className="login vh-100   d-flex justify-content-center   ">
        <div className=" container     row   justify-content-center align-items-center w-100 h-100   ml-1  " >
            <div className="block text-center    rounded-bottom py-5 px-5 col-12">

            <h2>Welcome Back</h2>
            {error? <Alert key='danger' variant='danger'>
          {error}
        </Alert>:null}
        {errorList?errorList.map(err=><Alert key={err.message} variant='danger'>{err.message}</Alert>):null}
            <form action="" className='d-flex flex-column' onSubmit={HandleLogin}>

            <input onChange={(e)=>setEmail(e.target.value)}  type="text" className= '  d-block  my-4 px-5 py-3 inp' name="email" id="email" placeholder='email' />
            <input onChange={(e)=>setPassword(e.target.value)}  type="password" className=' d-block  my-4 px-5 py-3 inp' name="password" id="password" placeholder='Password' />
            <button type='submit'  className='my-3' >{loader?<i className="fa-solid fa-rotate-right fa-spin"></i>:'Log in'}</button>
            </form>
              <Link to='/register' className='px-3 mt-2 mx-2 w-25  ' >Sign Up</Link>
              <Link to='/forgetPassword' className='px-3 mt-2 mx-2 w-25  ' >Forgot password</Link>
            {/* <a href='/' className='px-3 mt-2 mx-2  w-50  '>Forgot password</a>   */}
            </div>
        </div>
    </div>
  </>
}
