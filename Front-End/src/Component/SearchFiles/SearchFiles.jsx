import React, { useState } from 'react'
import { Alert, Form } from 'react-bootstrap';

export default function SearchFiles() {
    const [user_id, setUser_id] = useState("")
    const [err, setErr] = useState("")
    const [history, setHistory] = useState(null)
    async function getFiles(e){
        e.preventDefault();
        setErr(null)
        if(user_id==="")
          {
            setErr("Please enter a National ID")
            return;
          }
          else{

            const url = new URL(
              "https://aidoctortest.visooft-code.com/api/files/all/filter"
        );
        
        const headers = {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            "Accept": "application/json",
        };
        
        let body = {
            "id_number":`${user_id}`
        };
        console.log(body);
        try{

          let res=  await  fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
          }).then(response => response.json()).then(result=>{
            
            if(result.data.length>0){
              
              setHistory(result.data.reverse())
            }
            else {
              setErr("No Data Found")
            }
          });
          
          
        }
        catch(err) {
          setErr("Please enter a valid National ID")
          console.log(err);
          
          
        }
        
      }
        }
        return (
          
    <>
    <div className="searchFiles">
        <div className="container">
          {err&&<Alert variant='danger' className='my-2'>{err}</Alert>}
            <form  onSubmit={getFiles} >

            <Form.Label htmlFor="inputPassword5">National ID</Form.Label>
      <Form.Control
        type="text"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
        onChange={(e)=>setUser_id(e.target.value)}
      //  minLength={14}
      />
      <Form.Text id="passwordHelpBlock" muted>
        Write the national id of the user
      </Form.Text>

<button type='submit' className='btn btn-primary d-block'>Search</button>
            </form>

            {
                history&&history.map((el)=><>


                        <div className="oneHistory col-12 my-2 py-3 px-3 align-items-center   justify-content-between d-flex ">
                            <h6 className='m-0 flex-grow-1'>Dr.{el.doctor}</h6>
                            <a className=' flex-grow-1'  href={`${el.file}`} target="_blank" rel="noopener noreferrer">Link</a>
                                     <p className='m-0'>{(el.created_at).slice(0,10)}</p>
    
                        </div>


                </>)

                }
        </div>
    </div>
    
    </>
  )
}
