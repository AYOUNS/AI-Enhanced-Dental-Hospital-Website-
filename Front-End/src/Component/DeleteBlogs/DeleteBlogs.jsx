import React, { useEffect, useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function DeleteBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loader, setLoader] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [startingLoader, setStartingLoader] = useState(true);

  useEffect(() => {
    setStartingLoader(true);
    fetch('https://aidoctortest.visooft-code.com/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.data.reverse());
        setStartingLoader(false);
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error);
        setStartingLoader(false);
      });
  }, [deleted]);

  async function handleDelete(id) {
    setLoader(true);
    setDeleted(false);

    const url = `https://aidoctortest.visooft-code.com/api/blogs/${id}`;

    try {
      await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      // After successful deletion, set 'deleted' to true to trigger re-render
      setDeleted(true);
    } catch (error) {
      console.error('Error deleting blog:', error);
    } finally {
      setLoader(false);
    }
  }

  return (
    <>
      {startingLoader ? (
        <div className='container vh-100 d-flex align-items-center justify-content-center'>
          <i className="fa-solid fa-spinner fa-spin fa-5x"></i>
        </div>
      ) : (
        <div className="blogs py-4 position-relative">
          <div className="text-center deleteLoader">
            {loader ? (
              <i className="fa-solid fa-rotate-right fa-spin fa-10x text-center text-danger"></i>
            ) : null}
            {deleted ? (
              <Alert className="my-3" variant="danger">
                The Article was Deleted successfully
              </Alert>
            ) : null}
          </div>
          <Container className="">
            {blogs.length>0?blogs.map((article) => (
              <div key={article.id} className="article p-4 my-4 rounded-3">
                <div className="article-body p-3">
                  <h3 className="text-center pb-3">{article.title}</h3>
                  <p className="">{article.description.length < 300 ? article.description : article.description.slice(0, 300) + '....'}</p>
                  <div className="text-center">
                    <button onClick={() => handleDelete(article.id)} className="btn btn-danger text-light text-center">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )):<h3>No article yet</h3>}
          </Container>
        </div>
      )}
    </>
  );
}
