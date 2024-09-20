import logo from "./logo.svg";
import "./App.css";
import Home from "./Component/Home/Home";
import Login from "./Component/Login/Login";
import NavApp from "./Component/Navbar/NavApp";
import { Route, Routes } from "react-router";
import { useEffect, useState } from "react";
import Services from "./Component/Services/Services";
import Register from "./Component/Register/Register";
import Log from "./Component/Log2/Login";
import Blogs from "./Component/Blogs/Blogs";
import Article from "./Component/Article/Article";
// import Doctors from "./Component/admin/addDoctors";
// import Profile from "./Component/Profile1/Profile";
import AddArticle from "./Component/AdminPages/AddArticle";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import Reservations from "./Component/Reservations/Reservations";
import AddDoctors from "./Component/admin/AddDoctors";
import DeleteDoctor from "./Component/admin/DeleteDoctor";
import DocReservation from "./Component/docReservation/DocReservation";
import Upload from "./Component/Upload/Upload";
import BooksDoctors from "./Component/BOOK1/BooksDoctors";
import DeleteBlogs from "./Component/DeleteBlogs/DeleteBlogs";
import AddServices from "./Component/AddServices/AddServices";
// import { createBrowserRouter } from "react-router-dom";
// import Layout from "./Component/Layout/Layout";
import AdminRoute from "./Component/AdminRoute/AdminRoute";
// import Book from "./Component/BOOK/Book";
// import Book from "./Component/BOOK/book";
import Profile from "./Component/Profile1/Profile";
import GetReservationByDoctors from "./Component/GetReservationByDoctors/GetReservationByDoctors";
import Chat from './Component/Chat/Chat';
import Empty from "./Component/empty/empty";
import Table from "./Component/table";
import SearchFiles from "./Component/SearchFiles/SearchFiles";
import ForgetPassword from "./Component/ForgetPassword/ForgetPassword";
import ResetPassword from "./Component/ResetPassword/ResetPassword";

function App() {
  const [role, setRole] = useState("");
  const [user, setUser] = useState({});
  const [patientName, setPatientName] = useState("")
  // const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState("");
  async function getUser() {
    // if (localStorage.getItem("token")) {
    //   const url = new URL("http://aidoctortest.visooft-code.com/api/users");
    //   const headers = {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    //     "Accept": "application/json",
    // };
    //   console.log(localStorage.getItem("token"));
    //   console.log(localStorage.getItem("token"));
    //   let x = await fetch(url, {
    //     method: "GET",
    //     headers,
    //   })
    //     .then((response) => response.json())
    //     .then((res) => {
    //       console.log(res);
    //     });
    //   console.log(x);
    // }
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const url = new URL("https://aidoctortest.visooft-code.com/api/users");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        Accept: "application/json",
      };
      console.log(localStorage.getItem("token"));
      console.log(localStorage.getItem("token"));
      let x = fetch(url, {
        method: "GET",
        headers,
      })
        .then((response) => response.json())
        .then((res) => {
          // setRole(res.data);
          if (Array.isArray(res.data)) {
            setRole("admin");
          } else {
            setRole(res.data.role);
          }
          setUser(res.data);
          console.log("hi from app", res);
        });
      // console.log(x);
    }
    // console.log(user);

  }, []);
  // https://xd.adobe.com/view/17d462f5-1f33-44f5-8e68-24f6b7294b11-4287/
  /*const route=createBrowserRouter([
  {path:"/",element:<Layout/>,children:[
    {path:"home",element:<Home/>},
    {path:"services",element:<Services/>},
    {path:"home",element:<Home/>},
    {path:"home",element:<Home/>},
  ]}
])*/
console.log(user);
  return <>


    <div className="App">


      <NavApp
        setRole={setRole}
        setToken={setToken}
        role={role}
        token={token}
        setUser={setUser}
        user={user}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path='login' element={<Login/>}/> */}
        {/* <ProtectedRoute path='services' element={<Services/>}/>  */}
        <Route path="services" element={<Services />} />
        <Route path="register" element={<Register setRole={setRole} setToken={setToken} setUser={setUser} />} />
        <Route path="forgetPassword" element={<ForgetPassword/>} />
        <Route path="resetPassword" element={<ResetPassword/>} />
        <Route path="doctors/:id" element={<BooksDoctors  user={user}/>} />
        <Route
          path="login"
          element={
            <Log setRole={setRole} setToken={setToken} setUser={setUser} />
          }
        />
        <Route path="profile" element={<Profile user={user} />} />
        <Route
          path="blogs"
          element={
            // <ProtectedRoute role={role}>s
            <Blogs />
            // </ProtectedRoute>
          }
        />
        <Route path="deleteblogs" element={<DeleteBlogs />} />
        <Route path="blogs/:id" element={<Article />} />
        <Route path="adddoctor" element={<AddDoctors />} />
        {/* admin route */}
        <Route path="deletedoctor" element={<DeleteDoctor />} />
        <Route path="addservices" element={<AddServices />} />
        {/* <Route path="deletedoctor" element={<AddDoctors />} /> */}
        <Route path="addarticle" element={<AddArticle />} />
        <Route path="reservations" element={<Reservations  role={role}  />} />
        <Route path="model" element={<Upload />} />
        <Route path="docreservation" element={<DocReservation user={user} role={role} />} />
        <Route path="aaa" element={<Table />} />
        <Route path="chat/:id/:name" element={<Chat />} />
        {/* <Route path="chat/:gender" element={<Chat gender={user.gender} />} /> */}
        <Route path="chat" element={<Chat />} />
        <Route path="searchfiles" element={<SearchFiles />} />
        <Route path="*" element={<h1>error</h1>} />
      </Routes>
    </div>
  </>
}

export default App;
