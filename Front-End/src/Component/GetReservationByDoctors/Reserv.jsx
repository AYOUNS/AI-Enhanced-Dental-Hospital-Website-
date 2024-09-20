import React, { useState } from 'react'

export default function Reserv({reservation,role,setreservStatus}) {
    const [file,setFile]=useState(null)
    const [loaderA,setLoaderA]=useState(false)
    const [loaderR,setLoaderR]=useState(false)
    const [loaderAdd,setLoaderAdd]=useState(false)
    const [status,setStatus]=useState('')

   
    async function addFile(id_number){
      setLoaderAdd(true)
        // console.log(loader);
    const url = new URL(
      "https://aidoctortest.visooft-code.com/api/files"
  );
  console.log(file);
  const headers = {
      // "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Accept": "application/json",
  };
  
  const body = new FormData();
  body.append('id_number', id_number);
  body.append('file', file);
  console.log({id_number, file});
 await fetch(url, {
      method: "POST",
      headers,
      body,
  }).then(response => response.json()).then((result)=>console.log(result));
   
  setLoaderAdd(false)
   
  }
  async function approveReserv(id) {
    setStatus("")
    console.log(id);
    setLoaderA(true)
        const url = new URL(
          `https://aidoctortest.visooft-code.com/api/bookings/${id}/status`
      );
      
      const headers = {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Accept": "application/json",
      };
      
      let body = {
          "status": 2 
      };
    try {
      fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setreservStatus("Approved"); // Update status in parent component
        setStatus("Approved");
        setLoaderA(false)
      });
    } catch(err) {
      setLoaderA(false)
      console.error(err);
    }
  }
  
  async function rejectReserv(id) {
    console.log(id);
    setLoaderR(true)
    setStatus("");
        const url = new URL(
          `https://aidoctortest.visooft-code.com/api/bookings/${id}/status`
      );
      
      const headers = {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Accept": "application/json",
      };
      
      let body = {
          "status": 3 
      };
    try {
      fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setLoaderR(false)
        setreservStatus("Rejected"); // Update status in parent component
        setStatus("Rejected");
      });
    } catch(err) {
      setLoaderR(false)
      console.error(err);
    }
  }  
  return (
    <tr>
    <td scope="row">{reservation.name}</td>
    <td>{reservation.age}</td>
    <td>{reservation.phone}</td>
    <td>{reservation.gender}</td>
    {
      role==="admin"&&<>
        <td>
      
      <button
        className="btn btn-success"
        onClick={() => {approveReserv(reservation.id)
        }}
      >
        {loaderA?<i class="fa-solid fa-spinner fa-spin"></i>:"Approve"} 
      </button>
    </td>
    <td>
      
      <button
        className="btn btn-danger"
        onClick={() => {rejectReserv(reservation.id)
        }}
      >
        {loaderR?<i class="fa-solid fa-spinner fa-spin"></i>:"Reject"}     
      </button>
    </td>
      <td>
        {status?status:reservation.status}
      </td>
      </>
    }
  


    {
      role==="doctor"&&<>
    <td>
     <input type="file" name="file" id="" onChange={(e)=>setFile(e.target.files[0])} />
    </td>
    <td>
      <button
        className="btn btn-primary"
        onClick={() => {addFile(reservation.user.id_number)
        }}
      >
     {loaderAdd?<i class="fa-solid fa-spinner fa-spin"></i>:"Upload"}   
      </button>
    </td>
      
      
      </>
    }
  </tr>
  )
}
