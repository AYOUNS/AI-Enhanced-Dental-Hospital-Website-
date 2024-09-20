import React, { useState } from 'react'
import imgDoctor from '../../Assets/2185059_dental_dentist_dentistry_service_stomatologist_icon.png'
export default function Profile({user}) {
    const [userData,setUserData] =useState({})
   /* if (localStorage.getItem("token")) {
        const url = new URL("http://aidoctortest.visooft-code.com/api/users");
      
        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Accept": "application/json",
      }; 
        console.log(localStorage.getItem("token"));
        console.log(localStorage.getItem("token"));
        let x =  fetch(url, {
          method: "GET",
          headers,
        })
          .then((response) => response.json()).then((responseData) =>setUserData(responseData))
    }*/

    return <>
        <section className="personalAccount">
            <div className="container">
                <h4>Personal Account</h4>

                <div className="Details d-flex flex-wrap justify-content-between mb-5">
                    <div className="personalInformatons">
                        <h3>Personal Infromation</h3>

                        <p><i class="fa-solid fa-user"></i> <span className='username'>{user.name}</span> </p>
                        <p><i class="fa-solid fa-calendar-days"></i> <span className='date'>22/12/2000</span> </p>
                        <p><i class="fa-regular fa-id-card"></i> <span className='idCard'>{user.id_number}</span> </p>
                        <p><i class="fa-solid fa-phone"></i> <span className='phone'>{user.phone}</span> </p>
                        <p><i class="fa-solid fa-envelope"></i> <span className='email'>{user.email}</span> </p>
                        <p><i class="fa-solid fa-map-location"></i> <span className='location'>{user.address}</span> </p>
                    </div>

                    <div className="history">
                        <h3>History</h3>
                    </div>
                </div>



                <div className="reservations">
                    <h3>Reservation</h3>
                    <div className="book-Doctor d-flex flex-lg-row gap-sm-4  flex-wrap align-items-center justify-content-around">

                        <div className="detailsDoctor">
                            <h4>Dr/ Ahmed Shrief</h4>
                            <p>Lorem ipsum dolor, sit amet</p>
                        </div>
                        <div className="buttonBook align-self-end">
                            <button>Reservation confirmed</button>
                        </div>
                    </div>

                    <div className="book-Doctor d-flex flex-lg-row gap-sm-4  flex-wrap align-items-center justify-content-around">

                        <div className="detailsDoctor">
                            <h4>Dr/ Ahmed Shrief</h4>
                            <p>Lorem ipsum dolor, sit amet</p>
                        </div>
                        <div className="buttonBook align-self-end">
                            <button>Reservation confirmed</button>
                        </div>
                    </div>

                    <div className="book-Doctor d-flex flex-lg-row gap-sm-4  flex-wrap align-items-center justify-content-around">

                        <div className="detailsDoctor">
                            <h4>Dr/ Ahmed Shrief</h4>
                            <p>Lorem ipsum dolor, sit amet</p>
                        </div>
                        <div className="buttonBook align-self-end">
                            <button>Reservation confirmed</button>
                        </div>
                    </div>

                    <div className="book-Doctor d-flex flex-lg-row gap-sm-4  flex-wrap align-items-center justify-content-around">

                        <div className="detailsDoctor">
                            <h4>Dr/ Ahmed Shrief</h4>
                            <p>Lorem ipsum dolor, sit amet</p>
                        </div>
                        <div className="buttonBook align-self-end">
                            <button>Reservation confirmed</button>
                        </div>
                    </div>








                </div>
            </div>
        </section>

    </>
}
