import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ChatBox(props) {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const sendMessage = async () => {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Accept": "application/json",
    };
    const url = new URL(
      "https://aidoctortest.visooft-code.com/api/chats"
    );
    let body = {
      "user_id": props.doctorId,
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
  function send_close() {
    sendMessage()
    handleClose()
  }
  console.log(props.doctorId);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Chat
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send Message Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>



        </Modal.Body>
        <Modal.Footer>

          <div className="chat-input ">
            <input
              type="text"
              value={inputValue}

              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
            />

            <button onClick={send_close} ><i className="fa-solid fa-paper-plane"></i></button>


          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

