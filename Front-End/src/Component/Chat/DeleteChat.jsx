import React, { useEffect, useState } from 'react'



export default function DeleteChat() {
    const [doctors, setDoctors] = useState([])

    useEffect(() => {
        fetch('https://aidoctortest.visooft-code.com/api/doctors').then(res => res.json()).then(res => setDoctors(res.data));

    }, [])
    async function deleteChat(i) {
        console.log(i);
        const url = new URL(
            `https://aidoctortest.visooft-code.com/api/chats/${i}`
        );

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            "Accept": "application/json",
        };
        try {

            let x = fetch(url, {
                method: "DELETE",
                headers,
            }).then(response => response.json());
            console.log(x);

        } catch (err) {
            console.log(err);
        }

    }
    return (
        <>


            {
                doctors.map((el => {
                    return <>



                        <button className='bookbtn btn-danger bg-danger text-bg-light' onClick={() => deleteChat(el.id)}>Delete</button>


                    </>
                }))
            }


















        </>
    )
}
