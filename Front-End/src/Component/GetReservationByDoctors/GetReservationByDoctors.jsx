import React, { useEffect, useState } from "react";
import "./getReservationByDoctors.css";
import Reserv from "./Reserv";
export default function GetReservationByDoctors({ name, id, role }) {
  console.log(name, id);

  async function deleteReservation(id) {
    const url = new URL(
      `http://aidoctortest.visooft-code.com/api/bookings/${id}`
    );

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      Accept: "application/json",
    };
    try {
      fetch(url, {
        method: "DELETE",
        headers,
      })
        .then((response) => response.json())
        .then((responseData) => console.log(responseData));
    } catch (err) {
      console.log(err);
    }
  }

  const [reservations, setReservations] = useState([]);
  const [reservStatus, setreservStatus] = useState("");

  useEffect(() => {
    console.log("role", role);
    const url = new URL(
      `https://aidoctortest.visooft-code.com/api/bookings/${id}/user`
    );

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      Accept: "application/json",
    };
    try {
      fetch(url, {
        method: "GET",
        headers,
      })
        .then((response) => response.json())
        .then((response) => {
          // setReservations(response.data);
          console.log(response);

          let reserv = response.data.filter((reservation) => {
            const today = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));

            // Format today's date to match the created_at format
            const formattedDate = today.toISOString().slice(0, 10);
            // console.log("true",formattedDate===reservation.created_at);
            /*************************************** */

            if (reservation.date.slice(0, 10) === formattedDate) {
              return reservation;
            } else {
              console.log(false);
              return null;
            }
          });
          // console.log(reserv);

          setReservations(reserv);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <>
      <div className="container my-5">
        <h3 className="my-3 ">   {name} </h3>
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Phone</th>
              <th scope="col">gender</th>
              {role === "doctor" && (
                <>
                  <th scope="col">File</th>
                  <th scope="col">upload</th>
                </>
              )}
              {role === "admin" && (
                <>
                  <th scope="col">Approve</th>
                  <th scope="col">Reject</th>
                  <th scope="col">Status</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => {
              return (
                <>
                  {console.log(reservation)}
                  <Reserv
                    reservation={reservation}
                    deleteReservation={deleteReservation}
                    role={role}
                    setreservStatus={setreservStatus} // Pass setreservStatus function
                  />
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="brdr"></div>
    </>
  );
}
