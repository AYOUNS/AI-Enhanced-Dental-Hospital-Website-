import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import DocGetReservationByDoctors from "./docGetReservationByDoctors";

export default function DocReservation({ user,role }) {
  console.log("id", user.id);
  const [doctor, setDoctor] = useState(null);
  
  useEffect(() => {
    const url = new URL("https://aidoctortest.visooft-code.com/api/doctors");

    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };

    fetch(url, {
      method: "GET",
      headers,
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("res", res.data);
        const filteredDoctor = res.data.find((doc) => doc.user.id === user.id);
        if (filteredDoctor) {
          console.log("this is doc", filteredDoctor);
          setDoctor(filteredDoctor);
        }
      });
  }, [user.id]); // Include user.id in dependency array to trigger effect on user.id change

  return (
    <>
      {/* {console.log("doctor", doctor)} */}
      {doctor ? (
        <>
          <div className="container my-5">
            {/* <  id={doctor.id} name={doctor.user.name} /> */}
            <DocGetReservationByDoctors id={doctor.id} name={doctor.user.name} role={role}/>
          </div>
          {/* <div className="brdr"></div> */}
        </>
      ) : (
       
                <div className='container vh-100 d-flex align-items-center justify-content-center'>
                    <i className="fa-solid fa-spinner fa-spin fa-5x"></i>
                </div>
            
      )}
    </>
  );
}
