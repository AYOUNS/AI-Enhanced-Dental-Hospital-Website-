import Joi from 'joi'
import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'

export default function AddArticle() {
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")
  const [loader,setLoader]=useState(false)
  const [done,setDone]=useState(false)
  const [errorList,setErrorList]=useState([])
  function handelValidation(e){
    const schema=Joi.object({
      title:Joi.string().min(3),
      description:Joi.string().min(8)
    
    })
    return schema.validate({title,description},{abortEarly:false})
     }
  const handelSubmit = async (e) => {
    
    e.preventDefault();
    setDone(false)
    setLoader(true)
    setErrorList("")
    const url = new URL(
      "https://aidoctortest.visooft-code.com/api/blogs"
  );
  
  const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
  };
  
  let body = {
      "title": title,
      "description": description
  };
  let validation=handelValidation()
  if(!validation.error){
try{
  console.log("2");
  let send= await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
  }).then(response => response.json())//.then(result=>console.log(result));
  console.log(send);
  setDone(true)
  setLoader(false)

  console.log("3");
}
catch(err) {
  setLoader(false)
   
  console.log(err);
}}
else{
  setErrorList(validation.error.details )
  setLoader(false)
}
}
  return (


    <>
     <div className="login vh-100   d-flex justify-content-center   ">
        <div className=" container     row   justify-content-center align-items-center w-100 h-100   ml-1  " >
            <div className="block text-center    rounded-bottom py-5 px-5 col-12">
            <h2>Add Article</h2>
            {errorList?errorList.map(err=><Alert key={err.message} variant='danger'>{err.message}</Alert>):null}
            <form   className='d-flex flex-column'onSubmit={handelSubmit}    >

            <input    type="text" onChange={(e)=>setTitle(e.target.value)} className= '  d-block  my-4 px-5 py-3 inp' name="title" id="title" placeholder='Title' />
            <input   type="text" onChange={(e)=>setDescription(e.target.value)} className=' d-block  my-4 px-5 py-3 inp' name="description" id="description" placeholder='Description' />
           
            <button  type='submit'  className='px-3 mt-2 mx-2  w-100  '>{loader?<i className="fa-solid fa-rotate-right fa-spin"></i>:'Add Article'}</button>  
            </form>
            {done?<Alert   className='my-3'   variant='primary'>The Article was added successfuly </Alert>:null}
            </div>
        </div>
    </div>
    </>
  )
}
