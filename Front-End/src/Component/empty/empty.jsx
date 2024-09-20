import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
export default function Empty(props) {
console.log(props);
  const [doctors, setDoctors] = useState([]);

  const [book, setbook] = useState({
    phone: '',
    age: '',
    date: ''
  });

  console.log(props.patientName);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const url = new URL(
          "https://aidoctortest.visooft-code.com/api/doctors"
        );
        const headers = {
          "Content-Type": "application/json",
          "Accept": "application/json",
        };

        let responseDoctor = await fetch(url, {
          method: "GET",
          headers,
        }).then(response => response.json());
        setDoctors(responseDoctor.data);
        console.log(responseDoctor);

      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    fetchDoctors();
  }, []);


  function booksPatient(e) {
    let patient = { ...book };
    patient[e.target.name] = e.target.value;
    setbook(patient)
    console.log(patient);
    e.preventDefault()
  }

  const submitBooks = async (e) => {

    e.preventDefault()

    const url = new URL(
      "https://aidoctortest.visooft-code.com/api/bookings"
    );

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Accept": "application/json",
    };
    let genderPatient = null
    if (props.patientGender === "Male") {
      genderPatient = 1
    }
    else {
      genderPatient = 2
    }
     
    let body = {
      "name": props.patientName,
      "phone": book.phone,
      "gender": genderPatient,
      "age": Number(book.age) ,
      "doctor_id": props.doctorId,
      "date": book.date
    };


    let x = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    }).then(response => response.json());

    console.log(x);
    console.log(body);

  }

  console.log(props.patient);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="align-self-end">
          Book Doctor
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <form >





          {/* <div className="namePatientBook mb-5 w-100">
    <label htmlFor="name_patient" className='me-3 ms-2'>Name Patient: </label>
    <input type="text" onChange={booksPatient} id='namePatientBook' name='name' required className='w-50' />
</div> */}



          <div className="phonePatientBook mb-5">
            <label htmlFor="phone_patient" className='me-2 ms-2'>phone Patient: </label>
            <input type="tel" onChange={booksPatient} maxLength={11} id='phonePatientBook' required name='phone' className='w-50' />
          </div>


          {/* <div className="genderPatientBook d-flex flex-wrap gap-3 mb-5">
    <label htmlFor="genderPatientBook" className='me-3 ms-2'>Gender Patient: </label>
    <label htmlFor="male">male</label>
    <input type="radio" id='male' name='gender' onChange={booksPatient} value={'1'} required />
    <label htmlFor="female">Female</label>
    <input type="radio" onChange={booksPatient} id='female' name='gender' required value={'2'} />
</div> */}




          <div className="agePatientBook mb-5">
            <label htmlFor="agePatientBook" className='me-3 ms-2'>Age Patient: </label>
            <input type="number" min={0}  max={100} onChange={booksPatient} id='agePatientBook' required name='age' className='w-50' aria-required />
          </div>


          <div className="timeBook">
            <label htmlFor="datePatientBook" className='me-3 ms-2'>Age Patient: </label>
            <input type="datetime-local" onChange={booksPatient} name="date" id="datePatientBook" />
          </div>

          {/* <div className="doctorid">
    <label htmlFor="doctorid" className='me-3 ms-2'>Age Patient: </label>
    <input type="text" onChange={booksPatient} name="doctor_id" id="doctorid" value={doctors.data.id} />
</div> */}


        </form>


      </Modal.Body>
      <Modal.Footer>
        <div className="submit position-absolute">
          <input type="submit" className='btn btn-info' value="Submit" onClick={submitBooks} />

        </div>
      </Modal.Footer>
    </Modal>
  );

}