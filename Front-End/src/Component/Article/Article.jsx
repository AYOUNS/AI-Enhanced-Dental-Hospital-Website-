import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
 
import { useParams } from 'react-router'
import './article.css'
export default function Article() {
  const [article, setArticle] = useState({})
  const {id}=useParams()
  useEffect(() =>{
    fetch(`https://aidoctortest.visooft-code.com/api/blogs/${id}`).then((res) =>res.json()).then((data) =>setArticle(data.data))
        },[])
  return (
    <div className="article-page py-5   " style={{color:"##4a4848"}}>
        <Container className=' p-5'>
        <h2 className='text-center pb-5'>{article.title}</h2>
 <p className='px-5 article-p'> {article.description}</p>

        </Container>
    </div>
  )
}
