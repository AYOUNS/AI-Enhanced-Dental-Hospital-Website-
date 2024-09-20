import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import Joi from 'joi';

export default function Register({setUser,setAdmin,setDoctor,setRole,setToken}) {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    id_number: "",
    address: "",
    gender: 1, 
    role: "user"
  });

  const [error, setError] = useState("");
  const [errorList, setErrorList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handelValidation() {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().min(8).required(),
      name: Joi.string().min(2).required(),
      phone: Joi.string().pattern(/^(01)[0-9]{9}$/).required(),
      id_number: Joi.string().pattern(/^\d{14}$/).required(),
      address: Joi.string().min(3).required(),
      gender: Joi.number().required(),
      role: Joi.string(),
    });
    return schema.validate(info, { abortEarly: false });
  }

  const handelChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  async function HandleLogin(e) {
    setError(null)
    setErrorList(null)
    e.preventDefault();
    setLoading(true);
    let validate = handelValidation();
    if (!validate.error) {
      const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
      };
      try {
        setLoading(true);
        let login = await fetch('https://aidoctortest.visooft-code.com/api/auth/register', {
          method: "POST",
          headers,
          body: JSON.stringify(info),
        }).then(response => response.json());
        console.log("cdcd", login);
        if (login.errors) {
          setError(Object.values(login.errors));
        }
        else{
          // localStorage.setItem("userData", JSON.stringify(response.data))
          localStorage.setItem("token", JSON.stringify(login.data.token))
          setRole(login.data.role)
          setUser(login.data)
          // setToken(response.data.token)
          navigate('/')
        }
        setLoading(false);
      } catch (err) {
        console.log('Error: ' + err);
      }
    } else {
      setErrorList(validate.error.details);
    }
    setLoading(false);
  }

  return (
    <div className="login d-flex justify-content-center">
      <div className="container row justify-content-center align-items-center w-100 h-100 ml-1">
        <div className="block text-center rounded-bottom py-4 px-4 col-12">
          <h2 className='pt-4'>Create Account</h2>
          {errorList ? errorList.map(err => <Alert key={err.message} variant='danger'>{err.context.label==="phone"?"wrong phone number":err.context.label==="id_number"?"National ID must Equal 14 Number ":err.message}</Alert>) : null}
          {error? error.map((err)=><Alert key={error} variant='danger'> {Object.values(err)[0]} </Alert>):null}
          <form className='d-flex flex-column' onSubmit={HandleLogin}>
            <input onChange={handelChange} type="text" className='d-block my-4 px-5 py-3 inp' name="name" id="name" placeholder='Name' />
            <input onChange={handelChange} type="email" className='d-block my-4 px-5 py-3 inp' name="email" id="email" placeholder='Email' />
            <input onChange={handelChange} type="text" className='d-block my-4 px-5 py-3 inp' name="phone" id="phone" placeholder='Phone' />
            <input onChange={handelChange} type="text" className='d-block my-4 px-5 py-3 inp' name="id_number" id="id_number" placeholder='Id' />
            <input onChange={handelChange} type="text" className='d-block my-4 px-5 py-3 inp' name="address" id="address" placeholder='city' />
            <select onChange={handelChange} name="gender" id="gender" className='d-block my-4 px-5 py-3 inp'>
              <option value="1">Male</option>
              <option value="2">Female</option>
            </select>

            <input onChange={handelChange} type="password" className='d-block my-4 px-5 py-3 inp' name="password" id="password" placeholder='Password' />
            <button type='submit' className='my-3'>{loading ? <i className="fa-solid fa-rotate-right fa-spin"></i> : 'Sign Up'}</button>
          </form>
          <Link to='/login' className='px-3 mt-2 mx-2 w-25' >Login</Link>
          <a href='/' className='px-3 mt-2 mx-2 w-50'>Forgot password</a>
        </div>
      </div>
    </div>
  );
}