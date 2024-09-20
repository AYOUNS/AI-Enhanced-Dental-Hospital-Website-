import React, { useEffect, useState } from 'react'
import image from "../../Assets/serv.png"
import image2 from "../../Assets/serv2.png"
import "./services.css"
import { Link } from 'react-router-dom'
export default function Services() {
    const [services,setServices]=useState([])
    useEffect(() => {
        fetch(`https://aidoctortest.visooft-code.com/api/categories`).then((response) =>response.json()).then(data=>setServices(data.data))
    }, []);
    console.log(services);
  return (
  <>
  
<div className="services py-5 ">
    <div className="container py-5">
        <div className="row">
            {services.map((service,i) =><>
                <div className="col-md-4  col-sm-6 mt-3    " key={i}>
                <div className="card d-flex h-100  flex-column align-items-center  justify-content-center py-3   ">
                    <div className="image">
                        <img src={service.image} alt=""  className='w-100' />
                    </div>
                    <div className="content px-3">
                        <h2 className='text-center py-3'>{service.name}</h2>
                        <p>{service.desc}</p>
                    </div>
                    <Link to={`/doctors/${service.id}`} className='phover  pb-1'> select A doctor..  </Link>
                </div>
             </div>
            </>)}
             {/* <div className="   col-md-4  col-sm-6 mt-3   ">
                <div className="card d-flex flex-column align-items-center  justify-content-center py-3   ">
                    <div className="image ">
                        <img src={image} alt=""  className='w-100' />
                    </div>
                    <div className="content px-3">
                        <h2 className='text-center py-3'>DiseaseName</h2>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio quis sunt autem? Placeat, labore distinctio?</p>
                    </div>
                     <Link to='/doctors' className='phover  pb-1'> select A doctor..  </Link>
                </div>
             </div>
             <div className="   col-md-4  col-sm-6 mt-3">
                <div className="card d-flex flex-column align-items-center  justify-content-center py-3  ">
                    <div className="image ">
                        <img src={image} alt=""  className='w-100' />
                    </div>
                    <div className="content px-3">
                        <h2 className='text-center py-3'>DiseaseName</h2>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio quis sunt autem? Placeat, labore distinctio?</p>
                    </div>
                     <Link to='/doctors' className='phover  pb-1'> select A doctor..  </Link>
                </div>
             </div>
             <div className="   col-md-4 col-sm-6 mt-3">
                <div className="card d-flex flex-column align-items-center  justify-content-center py-3  ">
                    <div className="image ">
                        <img src={image} alt=""  className='w-100' />
                    </div>
                    <div className="content px-3">
                        <h2 className='text-center py-3'>DiseaseName</h2>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio quis sunt autem? Placeat, labore distinctio?</p>
                    </div>
                     <Link to='/doctors' className='phover  pb-1'> select A doctor..  </Link>
                </div>
             </div>
             <div className="   col-md-4 col-sm-6 mt-3 ">
                <div className="card d-flex flex-column align-items-center  justify-content-center py-3  ">
                    <div className="image ">
                        <img src={image2} alt=""  className='w-100' />
                    </div>
                    <div className="content px-3">
                        <h2 className='text-center py-3'>DiseaseName</h2>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio quis sunt autem? Placeat, labore distinctio?</p>
                    </div>
                     <Link to='/doctors' className='phover  pb-1'> select A doctor..  </Link>
                </div>
             </div>
             <div className="   col-md-4 col-sm-6 mt-3 ">
                <div className="card d-flex flex-column align-items-center  justify-content-center py-3  ">
                    <div className="image ">
                        <img src={image2} alt=""  className='w-100' />
                    </div>
                    <div className="content px-3">
                        <h2 className='text-center py-3'>DiseaseName</h2>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio quis sunt autem? Placeat, labore distinctio?</p>
                    </div>
                     <Link to='/doctors' className='phover  pb-1'> select A doctor..  </Link>
                </div>
             </div>
             <div className="   col-md-4 col-sm-6 mt-3 ">
                <div className="card d-flex flex-column align-items-center  justify-content-center py-3  ">
                    <div className="image ">
                        <img src={image2} alt=""  className='w-100' />
                    </div>
                    <div className="content px-3">
                        <h2 className='text-center py-3'>DiseaseName</h2>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio quis sunt autem? Placeat, labore distinctio?</p>
                    </div>
                     <Link to='/doctors' className='phover  pb-1'> select A doctor..  </Link>
                </div>
             </div> */}
        </div>
    </div>
</div>
  
  
  </>
  )
}
