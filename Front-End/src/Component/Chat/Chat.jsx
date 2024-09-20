import React, { useEffect, useState } from 'react'

import "../Chat/Chat.css"
import { useParams } from 'react-router';
import DeleteChat from './DeleteChat';

export default function Chat({ user }) {
    const { id } = useParams()
    const { name } = useParams()
    const [chat, setChats] = useState([]);
    const [chatUser, setChatUser] = useState([]);
    const [storeChat, setStoreChat] = useState([]);
    const [userId, setUserId] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [messageSent, setMessageSent] = useState(false);



    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,

        "Accept": "application/json",
    };


    useEffect(() => {

        const url = new URL(
            "https://aidoctortest.visooft-code.com/api/chats"
        );

        const fetchChats = async () => {
            try {

                let x = await fetch(url, {
                    method: "GET",
                    headers,
                }).then(response => response.json());

                setChats(x.data);
            } catch (error) {
                console.error('Error fetching chat data:', error);
            }
        };
        fetchChats();


    }, []);












    const sendMessage = async () => {

        const url = new URL(
            "https://aidoctortest.visooft-code.com/api/chats"
        );
        let body = {
            "user_id": userId,
            "content": inputValue
        };
        console.log(body);

        let response = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        });



        // console.log(response);
    }

    const getMessage = async (chatid, userId) => {
        const url = new URL(
            `https://aidoctortest.visooft-code.com/api/chats/${chatid}`
        );

        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        };


        let x = await fetch(url, {
            method: "GET",
            headers,
        }).then(response => response.json());

        setChatUser(x.data)
        setUserId(userId);
    }



    console.log(chat);
    // ==========================================================================================


    async function deleteChat(i) {
        console.log(i);
        const url = new URL(
            `https://aidoctortest.visooft-code.com/api/chats/${i}`
        );

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

    // const [selectedChat, setSelectedChat] = useState({ name: null, message: null });



    // const selectChat = (name, message) => {
    //     setSelectedChat({ name, message });
    //     console.log(selectedChat);

    // };
    // onClick={() => selectChat(chats.participant, chats.message)}

    // console.log(chat);
    return <>

        <section className="chatSupport d-flex">
            {/* <div className="circleSupport ">
                <i className="fa-solid fa-headset"></i>
            </div> */}

            <div className="allChats  vh-100">


                {chat && chat.length > 0 ? (
                    chat.map((chats) => (
                        <div className="chats">

                            <div key={chat.id} className='text-center' >
                                <button className='position-relative btnChat' onClick={() => { getMessage(chats.id, chats.user.id) }}>
                                    <h5>{chats.user.name}</h5>

                                    <div className="messageDate d-flex flex-wrap flex-column justify-content-between">
                                        <p className='date'>{chats.created_at}</p>
                                    </div>
                                    <button className='closeDelete ' onClick={() => deleteChat(chats.id)}><i class="fa-solid fa-xmark"></i></button>


                                </button>






                            </div>
                        </div>
                    ))
                ) : (
                    <p>No chats found.</p>
                )}


            </div>









            {chatUser.length > 0 ? (
                <div className="chat w-100"  >






                    <div className="headerChat d-flex flex-wrap justify-content-between align-items-center">

                        <h5>Dr /</h5>

                    </div>

                    <div className="chatMessages" >
                        {chatUser.map((getMessagee) => (
                            <>

                                {getMessagee.is_sender ? (
                                    <div className="message rightMessage">
                                        <p>{getMessagee.message}</p>
                                    </div>
                                ) : (
                                    <div className="message leftMessage">
                                        <p>{getMessagee.message}</p>
                                    </div>
                                )}

                            </>
                        ))}


                    </div>


                    <div className="chat-input ">
                        <input
                            type="text"
                            value={inputValue}

                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type your message..."
                        />

                        <button onClick={sendMessage}><i className="fa-solid fa-paper-plane"></i></button>


                    </div>




                </div >

            ) : (
                <p>No chats found.</p>
            )}







































        </section >



    </>
}
