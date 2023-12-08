import { useState, useEffect } from 'react'
import '../styles/posts.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from 'react-bootstrap';

export function Posts() {
    const [posts, setPosts] = useState([])
      function getPosts() {
        return fetch('https://apiprogrammingdev.onrender.com/posts',
        {method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
        },)
              .then(response => response.json())
              .then(data => {
                return data
              })
      }

      useEffect(() => {
        const fetchPosts = async () => {
            const publis = await getPosts()
            setPosts(publis)
        }
        fetchPosts()
      },[])

      return (
        <div className='form-box'>
            {posts.map(p => {
                return (
                    <div key={p.pk} className="col-12 col-lg-6 offset-lg-3 mb-4">
                            <a style={{color:'black',textDecoration:'none'}} href={`/posts/${p.pk}`}>
                                <h4><b>{p.fields.title}</b></h4>
                            </a>
                        <div className="row px-4">
                            <div className="col-auto mr-2">
                                    <a href="" className="link"><FontAwesomeIcon icon={faComment} /></a>
                            </div>
                            <div className="col-auto mr-2">
                                    <p>{p.fields.numComments}</p>
                            </div>
                            <div className="col-auto mr-2">
                                    <a href="" className="link"><FontAwesomeIcon icon={faArrowUp} /></a>
                            </div>
                            <div className="col-auto">
                                <p className="mr-2">
                                    {p.fields.totalVotes}
                                </p>
                            </div>
                            <div className="col-auto mr-2">
                                    <a href="" className="link"><FontAwesomeIcon icon={faArrowDown} /></a>
                            </div>
                            <div className="col-auto mr-2">
                                    <a href="" className="link"><FontAwesomeIcon icon={faStar} /></a>
                            </div>
                            <div className="dropdown col-auto">
                                <Dropdown>
                                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                                        &#8942;
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href=""><FontAwesomeIcon icon={faPenToSquare} />Editar</Dropdown.Item>
                                        <Dropdown.Item href=""><FontAwesomeIcon icon={faTrashCan} />Eliminar</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        <hr className="my-3"></hr>
                    </div>
                )
            })}
        </div>
        
      ) 
}