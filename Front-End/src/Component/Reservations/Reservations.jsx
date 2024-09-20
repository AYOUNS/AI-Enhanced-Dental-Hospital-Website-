import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import "./Reservations.css";
import GetReservationByDoctors from '../GetReservationByDoctors/GetReservationByDoctors';

export default function Reservations({role}) {
    
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://aidoctortest.visooft-code.com/api/doctors')
            .then((res) => res.json())
            .then((res) => {
                setDoctors(res.data);
                setLoading(false); // Data has been fetched, loading is done
            })
            .catch((error) => {
                console.error('Error fetching doctors:', error);
                setLoading(false); // In case of error, loading is done
            });
    }, []);

    return (
        <Container className='py-5'>
            {loading ? ( // Display loader while loading
                <div className='container vh-100 d-flex align-items-center justify-content-center'>
                    <i className="fa-solid fa-spinner fa-spin fa-5x"></i>
                </div>
            ) : (
                doctors.map((doctor) => (
                    <GetReservationByDoctors role={role} key={doctor.id} id={doctor.id} name={doctor.user.name} />
                ))
            )}
        </Container>
    );
}
