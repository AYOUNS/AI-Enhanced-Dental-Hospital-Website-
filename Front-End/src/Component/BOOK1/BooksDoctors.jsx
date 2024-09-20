import { Button, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import './booksDoctors.css';
import imgDoctor from '../../Assets/2185059_dental_dentist_dentistry_service_stomatologist_icon.png';
import { Link, useParams } from 'react-router-dom';
import Empty from '../empty/empty';
import ChatBox from "../Chat/ChatBox";

export default function BooksDoctors({ user }) {
    const { id } = useParams();
    const [doctors, setDoctors] = useState([]);
    const [doctorId, setDoctorId] = useState("");
    const [patientName, setPatientName] = useState("");
    const [patientGender, setPatientGender] = useState("");
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        fetch(`https://aidoctortest.visooft-code.com/api/doctors/${id}/category`)
            .then(res => res.json())
            .then(res => setDoctors(res.data));
    }, [id]);

    return (
        <>
            <Empty
                show={modalShow}
                onHide={() => setModalShow(false)}
                doctorId={doctorId}
                patientName={user.name}
                patientGender={user.gender}
            />

            <section className="books">
                <div className="container">
                    <div className="book-Doctors w-100">
                        {doctors.length > 0 ? (
                            doctors.map((el) => (
                                <div key={el.id} className="book-Doctor w-100 d-flex justify-content-between align-items-center mb-2">
                                    <div className="imgDoctor">
                                        <img src={imgDoctor} alt="Doctor" />
                                    </div>
                                    <div className="detailsDoctor text-center">
                                        <h4>{el.user.name}</h4>
                                        <h5>{el.description}</h5>
                                        <p>{el.specialization}</p>
                                    </div>
                                    <div className="buttonBook align-self-end">
                                        <Button
                                            className='bookbtn'
                                            variant="primary"
                                            onClick={() => {
                                                setModalShow(true);
                                                setDoctorId(el.id);
                                            }}
                                        >
                                            BOOK
                                        </Button>
                                        <ChatBox doctorId={el.user.id} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No doctors added</p>
                        )}
                    </div>
                </div>
                <div className="layoutt d-none w-100 h-100 position-absolute"></div>
            </section>
        </>
    );
}
