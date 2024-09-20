import React, { useEffect, useState } from 'react'
import imgDoctor from '../../Assets/2185059_dental_dentist_dentistry_service_stomatologist_icon.png'
import { Link } from "react-router-dom";
export default function Profile({ user }) {
    const [reservations, setReservations] = useState(null)
    const [history, setHistory] = useState(null)
    useEffect(()=>{
        const headers = {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${JSON.parse(localStorage.getItem("token"))}` ,  
            "Accept": "application/json",
        };
        
    fetch(`https://aidoctortest.visooft-code.com/api/bookings`,{
        headers
    }).then((response)=>response.json())
    .then((result)=>{
       result.data.reverse()
        setReservations(result.data)})
    
    
    fetch(`https://aidoctortest.visooft-code.com/api/files`,{
        headers
    }).then((response)=>response.json())
    .then((result)=>{
        result.data.reverse() 
        setHistory(result.data)})
    
     
    
    
    },[])

    function convertDateFormat(inputDate) {
        return inputDate.split(" ")[0];
    }

















    

    

    return <>
        <section className="personalAccount">
            <div className="container">
                <h4>Personal Account</h4>

                <div className="Details d-flex flex-wrap flex-lg-row flex-md-row flex-column gap-sm-5 justify-content-between mb-5 ">
                    <div className="personalInformatons col-12 col-lg-6 my-3">
                        <h3>Personal Infromation</h3>

                        <p><i class="fa-solid fa-user"></i> <span className='username'>{user.name}</span> </p>
                        <p><i class="fa-solid fa-calendar-days"></i> <span className='date'>{user.created_at}</span> </p>
                        <p><i class="fa-regular fa-id-card"></i> <span className='idCard'>{user.id_number}</span> </p>
                        <p><i class="fa-solid fa-phone"></i> <span className='phone'>{user.phone}</span> </p>
                        <p><i class="fa-solid fa-envelope"></i> <span className='email'>{user.email}</span> </p>
                        <p><i class="fa-solid fa-map-location"></i> <span className='location'>{user.address}</span> </p>
                    </div>

                    <div className="history overflow-auto col-12 col-lg-5 my-3">
                        <h3>History</h3>

                    <div className="d-flex  flex-wrap align-items-center   ">
                    {
                history&&history.map((el)=><>


                        <div className="oneHistory col-12 my-2 py-3 px-3 align-items-center   justify-content-between d-flex ">
                            <h6 className='m-0 flex-grow-1'>{el.doctor}</h6>
                            <a className=' flex-grow-1'  href={`${el.file}`} target="_blank" rel="noopener noreferrer">Link</a>
                           
                            <p className='m-0'>{convertDateFormat(el.created_at)}</p>
    
                        </div>


                </>)

                }
                       
 


                        </div>
                                            </div>
                </div>



                <div className="reservations">
                    <h3>Reservation</h3>
                    {reservations && reservations.map(reservation => <>
                        {console.log(reservation)}
                        <div className="book-Doctor d-flex flex-lg-row gap-sm-4  flex-wrap align-items-center justify-content-around">

                            <div className="detailsDoctor">
                                <h4>Dr.{reservation.doctor}</h4>
                                <p>Created at {reservation.created_at}</p>
                                <p>Date of reservation {reservation.date.slice(0,10)}</p>
                                <p > Status of reservation <span className='text-primary'>{reservation.status}</span></p>
                            </div>
                            <div className="buttonBook align-self-end">
                          {/* <Link to={`/chat/${reservation.id}`}><button>Chat</button></Link>        */}
                           
                            </div>
                        </div>

                    </>)}


                    {/* <div className="book-Doctor d-flex flex-lg-row  gap-sm-4  flex-wrap align-items-center justify-content-around">

                        <div className="detailsDoctor">
                            <h4>Dr/ Ahmed Shrief</h4>
                            <p>Lorem ipsum dolor, sit amet</p>
                        </div>
                        <div className="buttonBook align-self-end">
                            <button>Reservation confirmed</button>
                        </div>
                    </div> */}











                </div>
            </div>
        </section>

    </>
}
