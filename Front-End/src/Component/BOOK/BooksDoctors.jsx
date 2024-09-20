
import React, { useEffect, useState } from 'react'
import imgDoctor from '../../Assets/2185080_dental_dentist_enamel_enamel teeth_medical_icon.png'

import '../BOOK/BooksDoctors.css'

export default function BooksDoctors() {


    const [book, setbook] = useState({
        name: '',
        phone: '',
        gender: 0,
        age: 0,
        doctor_id: '14',
        date: ''
    });
    function booksPatient(e) {
        let patient = { ...book };
        patient[e.target.name] = e.target.value;
        setbook(patient)
        console.log(patient);
        e.preventDefault()
    }
    const [doctors,setDoctors]=useState([])
    useEffect(()=>{
        fetch('https://aidoctortest.visooft-code.com/api/doctors').then(res=>res.json()).then(res=>setDoctors(res.data));


    },[])
    const submitBooks = async (e) => {
        e.preventDefault()

        const url = new URL(
            "https://aidoctortest.visooft-code.com/api/bookings"
        );

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer 6802|qC0ZYEPj9bHAbclCO9LibtYi9W6wRhEBsgj4BirP20ad5c99     `,
            "Accept": "application/json",
        };

        let body = {
            "name": book.name,
            "phone": book.phone,
            "gender": book.gender,
            "age": book.age,
            "doctor_id": "1",
            "date": book.date
        };

        let x = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        }).then(response => response.json());

        console.log(x);


    }









    return <>


        <section className="books  position-relative">
            <div className="layoutTap position-absolute" >

                <div className="details pt-3 ps-4 d-flex flex-lg-column flex-sm-column flex-wrap justify-content-center position-relative">
                    <div className="iconClose position-absolute close" onClick={() => {
                        let layout = document.querySelector(".layoutTap");
                        layout.style.display = 'none';
                    }}>
                        <i onclo class="fa-solid fa-circle-xmark " ></i>
                    </div>

                    <form >





                        <div className="namePatientBook mb-5 w-100">
                            <label htmlFor="name_patient" className='me-3 ms-2'>Name Patient: </label>
                            <input type="text" onChange={booksPatient} id='namePatientBook' name='name' required className='w-50' />
                        </div>






                        <div className="phonePatientBook mb-5">
                            <label htmlFor="phone_patient" className='me-2 ms-2'>phone Patient: </label>
                            <input type="tel" onChange={booksPatient} maxLength={11} id='phonePatientBook' required name='phone' className='w-50' />
                        </div>






                        <div className="genderPatientBook d-flex flex-wrap gap-3 mb-5">
                            <label htmlFor="genderPatientBook" className='me-3 ms-2'>Gender Patient: </label>
                            <label htmlFor="male">male</label>
                            <input type="radio" id='male' name='gender' onChange={booksPatient} value={'1'} required />
                            <label htmlFor="female">Female</label>
                            <input type="radio" onChange={booksPatient} id='female' name='gender' required value={'2'} />
                        </div>




                        <div className="agePatientBook mb-5">
                            <label htmlFor="agePatientBook" className='me-3 ms-2'>Age Patient: </label>
                            <input type="text" onChange={booksPatient} id='agePatientBook' required name='age' className='w-50' />
                        </div>







                        <div className="timeBook">
                            <label htmlFor="datePatientBook" className='me-3 ms-2'>Age Patient: </label>
                            <input type="datetime-local" onChange={booksPatient} name="date" id="datePatientBook" />
                        </div>







                        <div className="submit position-absolute">
                            <input type="submit" value="Submit" onClick={submitBooks}  />

                        </div>
                    </form>

                </div>
            </div>














            <div className="container">
                <div className="book-Doctors" >
                   
                    <div className="book-Doctor d-flex align-items-center mt-4 mb-4">
                        <div className="imgDoctor">
                            <img src={imgDoctor} alt="" />
                        </div>
                        <div className="detailsDoctor">


                            <h4>Ahmed Shrief</h4>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem, quae nemo. consequuntur sint consectetur nam a quas sed.</p>
                        </div>
                        <div className="buttonBook align-self-end">
                            <button className='bookbtn' onClick={() => {
                                let layout = document.querySelector(".layoutTap");
                                layout.style.display = 'flex';
                            }} >BOOK</button>
                        </div>
                    </div>

                    <div className="book-Doctor d-flex align-items-center mb-4">
                        <div className="imgDoctor">
                            <img src={imgDoctor} alt="" />
                        </div>
                        <div className="detailsDoctor">
                            <h4>Ahmed Shrief</h4>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem, quae nemo. consequuntur sint consectetur nam a quas sed.</p>
                        </div>
                        <div className="buttonBook align-self-end">
                        <button className='bookbtn' onClick={() => {
                                let layout = document.querySelector(".layoutTap");
                                layout.style.display = 'flex';
                            }} >BOOK</button>
                        </div>
                    </div>

                    <div className="book-Doctor d-flex align-items-center mb-4">
                        <div className="imgDoctor">
                            <img src={imgDoctor} alt="" />
                        </div>
                        <div className="detailsDoctor">
                            <h4>Ahmed Shrief</h4>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem, quae nemo. consequuntur sint consectetur nam a quas sed.</p>
                        </div>
                        <div className="buttonBook align-self-end">
                            <button className='bookbtn'>BOOK</button>
                        </div>
                    </div>

                    <div className="book-Doctor d-flex align-items-center mb-4">
                        <div className="imgDoctor">
                            <img src={imgDoctor} alt="" />
                        </div>
                        <div className="detailsDoctor">
                            <h4>Ahmed Shrief</h4>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem, quae nemo. consequuntur sint consectetur nam a quas sed.</p>
                        </div>
                        <div className="buttonBook align-self-end">
                            <button>BOOK</button>
                        </div>
                    </div>

                    <div className="book-Doctor d-flex align-items-center mb-4">
                        <div className="imgDoctor">
                            <img src={imgDoctor} alt="" />
                        </div>
                        <div className="detailsDoctor">
                            <h4>Ahmed Shrief</h4>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem, quae nemo. consequuntur sint consectetur nam a quas sed.</p>
                        </div>
                        <div className="buttonBook align-self-end">
                            <button>BOOK</button>
                        </div>
                    </div>



                </div>
            </div>
            <div className="layoutt d-none w-100 h-100 position-absolute"></div>
        </section>




    </>
}
