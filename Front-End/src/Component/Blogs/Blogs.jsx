import React, { useEffect, useState } from 'react'
import "./blog.css"
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function Blogs( ) {
    const [blogs, setBlogs] = useState([])
    useEffect(() =>{
fetch('https://aidoctortest.visooft-code.com/api/blogs').then((res) =>res.json()).then((data) =>setBlogs(data.data.reverse()))
 
    },[])
  return (
    
    <div   className="blogs py-4 ">
 
    <Container className='   h-100  '>
        {
          blogs.length>0 ? blogs.map((article)=>

            <div key={article.id} className="article   p-4 my-4 rounded-3">
        <div className="article-body  p-3 ">
            <h3 className='text-center pb-3 '>{article.title}</h3>
           
            <p className=''> {article.description.length<300?article.description:article.description.slice(0,300)+"...."}</p>
       <div className='text-center'>
            
        <Link to={`/blogs/${article.id}`} className='btn btn-outline-info  text-light text-center'>More</Link>
       </div>
       <span className='d-block text-end'>created at {article.created_at}</span>
        </div>
    </div>
            ):<h3 className='my-auto'>No blogs yet...</h3>
        }
  

    
 
     
     
    



    </Container>
    </div>
  )
}
