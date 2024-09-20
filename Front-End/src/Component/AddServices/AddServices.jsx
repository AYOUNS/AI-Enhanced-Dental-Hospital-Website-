import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'

export default function AddServices() {
  const [loading,setLoading]=useState(false)
  const [success,setSuccess]=useState(false)
  const [errors,setErrors]=useState([])
  const [services, setServices] = useState({
    name:"",
    description:"",
    slug:'',
    image:null
  })
  const handelChange=(e)=>{
    let copy={...services}
    if(e.target.name==="image"){
      copy[e.target.name]=  e.target.files[0]
    }
    else{
      copy[e.target.name]=e.target.value
      
    }
    setServices(copy)
    // console.log(e.target.name);
  }
  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    console.log(services);
    const body = new FormData();
    body.append('name', services.name);
    body.append('description', services.description);
    body.append('slug', services.slug);
    body.append('image', services.image);
  
    const headers = {
       
      "Accept": "application/json",
  };
  console.log("ewe",body);
    try {
      setErrors([])
      setSuccess(false)
      const send = await fetch('https://aidoctortest.visooft-code.com/api/categories',{
        method: "POST",
        headers,
        body,
    }).then(response => response.json());
    if(!send.errors){

      setSuccess(true)
    }
    else {
      const arrayOfObjects = Object.entries(send.errors).map(([key, value]) => ({ [key]: value }));
      setErrors(arrayOfObjects)
    }
      console.log(send);
    } catch (error) {
      console.error('Error:', error);
    }

    setLoading(false)
  };
 
  return (
     <>
     
     <div className='admin    '>
      <div className="container pt-4">
      <div className="  d-flex justify-content-center   ">
        <div className=" container     row   justify-content-center align-items-center w-100 h-100   ml-1  " >
            <div className="block text-center    rounded-bottom pt-5 px-3 col-12">

            <h2 className=' '>Add Services</h2>
      {success&&<Alert    variant='success'> Successfully Added </Alert> }
      {errors? errors.map((err)=><Alert key={errors} variant='danger'> {Object.values(err)[0]} </Alert>):null}
            <form  className='d-flex flex-column' onSubmit={handelSubmit}   >

            <input onChange={handelChange}    type="text" className=' d-block  my-4 px-5 py-3 inp' name="name" id="name" placeholder='Name' />
            <input onChange={handelChange}   type="text" className=' d-block  my-4 px-5 py-3 inp' name="description" id="description" placeholder='Description' />
            <input onChange={handelChange}   type="text" className= '  d-block  my-4 px-5 py-3 inp' name="slug" id="slug" placeholder='Slug' />
            <input onChange={handelChange}    type="file" className=' d-block  my-4 px-5 py-3 inp' name="image" id="image" placeholder='image' />
            <button type='submit'  className='my-4 '>{loading?<i className="fa-solid fa-rotate-right fa-spin"></i>:'Add'}</button>
            </form>
            
             
            </div>
        </div>
    </div>
      </div>
    </div>
     
     </>
  )
}
