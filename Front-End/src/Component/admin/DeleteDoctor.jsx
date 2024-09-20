import React, { useEffect, useState } from 'react';
import imgDoctor from '../../Assets/2185059_dental_dentist_dentistry_service_stomatologist_icon.png';

export default function DeleteDoctor() {
    const [doctors, setDoctors] = useState(null);

    useEffect(() => {
        fetch('https://aidoctortest.visooft-code.com/api/doctors')
            .then(res => res.json())
            .then(res => setDoctors(res.data))
            .catch(err => console.error('Error fetching doctors:', err));
    }, []);

    async function deleteDoctor(id) {
        console.log(id);
        const url = new URL(
            `https://aidoctortest.visooft-code.com/api/doctors/${id}`
        );

        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers,
            });

            if (response.ok) {
                // Doctor deleted successfully, update the state to trigger rerender
                setDoctors(doctors.filter(doctor => doctor.id !== id));
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <section className="books">
                <div className="container">
                    <div className="book-Doctors d-flex flex-row">
                        {doctors ? (
                            doctors.map(el => (
                                <div key={el.id} className="col-md-6 col-4 px-2 my-2">
                                    <div className="book-Doctor d-flex flex-column align-items-center justify-content-center">
                                        {/* <div className="imgDoctor">
                                            <img src={imgDoctor} alt="" />
                                        </div> */}
                                        <div className="detailsDoctor">
                                            <h4>{el.user.name}</h4>
                                            <p>{el.specialization}</p>
                                        </div>
                                        <div className="buttonBook align-self- ">
                                            <button className="bookbtn btn-danger bg-danger text-bg-light" onClick={() => deleteDoctor(el.id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="container vh-100 d-flex align-items-center justify-content-center">
                                <i className="fa-solid fa-spinner fa-spin fa-5x"></i>
                            </div>
                        )}
                    </div>
                </div>
                <div className="layoutt d-none w-100 h-100 position-absolute"></div>
            </section>
        </>
    );
}
