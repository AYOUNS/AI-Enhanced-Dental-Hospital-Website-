import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./nav.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
function BasicExample({

  user,
  setAdmin,
  admin,
  doctor,
  token,
  role,
  setRole,
  setToken,
}) {
  const [userData, setUserData] = useState(localStorage.getItem("userData"));
  // const [user, setUser] = useState(null);
  // const [token,setToken] = useState('')
  /*useEffect(() => {
    if (localStorage.getItem("userData")) {
      setUserData(localStorage.getItem("userData"));
      setRole(JSON.parse(localStorage.getItem("userData")).role);
      setToken(JSON.parse(localStorage.getItem("userData")).token);
    }
  }, []);*/
  /* async function getUser() {
     const url = new URL("http://aidoctortest.visooft-code.com/api/users");
 
     const headers = {
       "Content-Type": "application/json",
       "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
       "Accept": "application/json",
     }; 
     console.log(localStorage.getItem("token"));
     if (localStorage.getItem("token")) {
       console.log(localStorage.getItem("token"));
       const x = await fetch(url, {
         method: "GET",
         headers,
       })
         .then((response) => response.json())
         .then((res) => {
           console.log(res);
         });
       console.log(x);
     }
   }
   useEffect(() => {
     getUser()
   }, []);*/
  //   useEffect(() => {
  //     if(localStorage.getItem("userData")){

  //    }

  //  },[]);
  async function logOut(e) {
    const url = new URL("https://aidoctortest.visooft-code.com/api/auth/logout");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };

    try {

      await fetch(url, {
        method: "POST",
        headers,
      })
        .then((response) => response.json())
        .then((res) => console.log(res));
    }
    catch (err) {

      console.log(err);
    }
  }
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiar    w-100 z-3 "
      style={{ backgroundColor: "darkcyan" }}
    >
      <Container fluid className="px-5">
        <Link
          className="text-light navbar-brand"
          style={{ fontSize: "30px", fontWeight: "bold" }}
          to="/"
        >
          Dental clinic
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {role === "user" ? (
              <>
                <Link to="/" className="nav-link text-light px-3">
                  Home
                </Link>
                <Link to="services" className="nav-link text-light px-3">
                  Services
                </Link>
                <Link to="blogs" className="nav-link text-light px-3">
                  Blogs
                </Link>
                <Link to="profile" className="nav-link text-light px-3">
                  Profile
                </Link>
                <Link to="model" className="nav-link text-light px-3">
                  Model
                </Link>
                <Link to="chat" className="nav-link text-light px-3">
                  Chat
                </Link>
                {/* <Link to="model" className="nav-link text-light px-3">
                  {user.name}
                </Link> */}

                {/* <Link  to="model" className="nav-link text-light px-3">{user.role}</Link> */}
              </>
            ) : null}
            {role === "admin" ? (
              <>
                <Link to="adddoctor" className="nav-link text-light px-3">
                  Add Doctor
                </Link>
                <Link to="addarticle" className="nav-link text-light px-3">
                  Add Article
                </Link>
                <Link to="reservations" className="nav-link text-light px-3">
                  reservations
                </Link>
                <Link to="deletedoctor" className="nav-link text-light px-3">
                  Delete doctor
                </Link>
                <Link to="deleteblogs" className="nav-link text-light px-3">
                  Delete Article
                </Link>
                <Link to="addservices" className="nav-link text-light px-3">
                  Add Services
                </Link>

              </>
            ) : null}
            {role === "doctor" ? (
              <>
                <Link to="docreservation" className="nav-link text-light px-3">
                  Reservation
                </Link>
                <Link to="addarticle" className="nav-link text-light px-3">
                  Add Article
                </Link>
                <Link to="chat" className="nav-link text-light px-3">
                  Chat
                </Link>
                <Link to="searchfiles" className="nav-link text-light px-3">
                  search for files
                </Link>
              </>
            ) : null}
            {/* <Nav.Link className='text-light'   href="#link">About</Nav.Link> */}
          </Nav>
          <div className="d-flex justify-content-center">
            {role ? (
              <>
                <Link
                  to="login"
                  className="mr-2 btn  reg-btn text-light border-0  "
                  onClick={(e) => {
                    localStorage.removeItem("userData");
                    setRole(null);
                    localStorage.removeItem("userData");
                    localStorage.removeItem("token")
                    logOut();
                  }}
                >
                  sign out
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="register"
                  className="mx-2 btn reg-btn text-light border-0"
                >
                  Sign up
                </Link>

                <Link
                  to="login"
                  className="mr-2 btn  reg-btn text-light border-0  "
                >
                  log in
                </Link>
              </>
            )}

            {/* <Link to="login" className='mr-2 btn btn-outline-danger text-light border-0  '>log in</Link> */}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
