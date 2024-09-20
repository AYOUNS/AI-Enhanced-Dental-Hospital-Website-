import React from 'react'
import "./home.css"
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from 'react-bootstrap'
import homeImage from"../../Assets/pexels-anna-shvets-3845736.jpg"
import { useEffect } from 'react'
export default function Home() {
    const navigate=useNavigate()
    useEffect(()=>{
        if(!localStorage.getItem("userData"))
        {
// navigate("login")
        }


    })
  return (
    <div className='home py-5 vh-100'>
        <Container className='py-5'>
            <Row className='py-5' >
                <Col md={6}  className='order-sm-0'>
                
                <div className="home-content">
                    <h2 >Teeth <br /> cleaning & <br /> Whitening,<br /> on your time</h2>
                    {/* <button className='mt-3 '>book Appointment</button> */}
                </div>
                
                
                
                
                
                
                
                </Col>
                <Col md={6} className=' d-md-flex justify-content-center  seconcol'>
                <div className="home-image">
                    <img className='w-100' src={homeImage} alt="" />
                </div>
                
                
                
                </Col>




            </Row>



        </Container>
        
        
         </div>
  )
}
