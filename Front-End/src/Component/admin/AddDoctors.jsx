import React, { useEffect, useState } from 'react';
import "./doctor.css";
import Joi from 'joi';
import { Alert } from 'react-bootstrap';

export default function AddDoctors() {
  const [error, setError] = useState([]);

  const [info, setInfo] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    id_number: "",
    address: "",
    gender: 1,
    role: "user",
    category_id: null,
    description: "",
    specialization: ""
  });
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [success, setSuccess] = useState(false);
  const handelChange = (e) => {
    let copy = { ...info };
    copy[e.target.name] = e.target.value;
    setInfo(copy);
  };

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError(null)
    setErrorList(null)
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };
    let validation=handelValidation();
    console.log(validation);
    if(!validation.error){



      try {
        setLoading(true);
        let login = await fetch('https://aidoctortest.visooft-code.com/api/auth/register', {
          method: "POST",
          headers,
          body: JSON.stringify({
            name: info.name,
            email: info.email,
            phone: info.phone,
            password: info.password,
            id_number: info.id_number,
            address: info.address,
            gender: info.gender,
            role: "user",
          }) 
        }).then(response => response.json());
        console.log(login);
        if(login.errors){
          const arrayOfObjects = Object.entries(login.errors).map(([key, value]) => ({ [key]: value }));
          console.log(arrayOfObjects);
          setError(arrayOfObjects)
        }
        let createDoctor = await fetch('https://aidoctortest.visooft-code.com/api/doctors', {
          method: "POST",
          headers,
          body: JSON.stringify({
            user_id: login.data.id,
            category_id: info.category_id,
            description: info.description,
            specialization: info.specialization
          }),
        }).then(response => response.json());
        console.log("createDoctor", createDoctor);
        setLoading(false);
        setSuccess(true)
      }
      catch (err) {
        console.log('Error: ' + err);
        setLoading(false);
      }
    }
    else{
      setErrorList(validation.error.details);
      setLoading(false);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetch("https://aidoctortest.visooft-code.com/api/categories")
      .then(response => response.json())
      .then(result => setCats(result.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  function handelValidation() {
    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','edu'] } }).required() ,
      password: Joi.string().min(8).required(),
      name: Joi.string().min(2).required(),
      phone: Joi.string().pattern(/^(01)[0-9]{9}$/).required(),
      id_number: Joi.string().pattern(/^\d{14}$/).required(),
      address: Joi.string().min(3).required(),
      gender: Joi.number().required(),
      category_id: Joi.number().required(),
      description: Joi.string().required(),
      specialization: Joi.string().required(),
      role: Joi.string(),
    });
    return schema.validate(info, { abortEarly: false });
  }
  return (
    <div className='admin'>
      <div className="container pt-4">
        <div className="d-flex justify-content-center">
          <div className="container row justify-content-center align-items-center w-100 h-100 ml-1">
            <div className="block text-center rounded-bottom pt-5 px-3 col-12">
              <h2 className=''>Add Doctor</h2>
              {errorList ? errorList.map(err => <Alert key={err.message} variant='danger'>{err.context.label==="phone"?"wrong phone number":err.context.label==="id_number"?"National ID must Equal 14 Number ":err.message}</Alert>) : null}
              {error? error.map((err)=><Alert key={error} variant='danger'> {Object.values(err)[0]} </Alert>):null}
              {success&&<Alert    variant='success'> Successfully Added </Alert> }
              <form className='d-flex flex-column' onSubmit={handleLogin}>
                <input onChange={handelChange} type="text" className='d-block my-4 px-5 py-3 inp' name="name" id="name" placeholder='Name' />
                <input onChange={handelChange} type="email" className='d-block my-4 px-5 py-3 inp' name="email" id="email" placeholder='Email' />
                <input onChange={handelChange} type="text" className='d-block my-4 px-5 py-3 inp' name="phone" id="phone" placeholder='phone' />
                <input onChange={handelChange} type="text" className='d-block my-4 px-5 py-3 inp' name="id_number" id="id_number" placeholder='Id' />
                <input onChange={handelChange} type="text" className='d-block my-4 px-5 py-3 inp' name="address" id="address" placeholder='Address' />
                <input onChange={handelChange} type="password" className='d-block my-4 px-5 py-3 inp' name="password" id="password" placeholder='Password' />
                <select  onChange={handelChange} name="category_id" className="  my-4 px-5 py-3 inp">
                  <option value="">Select Category</option>
                  {cats.map((cat, index) => (
                    <option key={index} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <input onChange={handelChange} type="text" className='d-block my-4 px-5 py-3 inp' name="description" id="description" placeholder='description' />
                <input onChange={handelChange} type="text" className='d-block my-4 px-5 py-3 inp' name="specialization" id="specialization" placeholder='specialization' />
                <button type='submit' className='my-3'>{loading ? <i className="fa-solid fa-rotate-right fa-spin"></i> : 'Sign Up'}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
