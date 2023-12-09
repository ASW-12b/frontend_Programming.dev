import { useParams } from 'react-router-dom';
import {useState,useEffect} from 'react'
import '../styles/layout.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { Dropdown } from 'react-bootstrap';
import { CommentsPost } from './CommentsPost';

export function Post () {
    let {postId} = useParams()
    const [post,setPost] = useState(null)
    function getPost() {
        return fetch(`https://apiprogrammingdev.onrender.com/posts/${postId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': '3ed9e367-519d-4435-8b35-c15d829e528f',
            },
          })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            return data
            }
            )
            .catch(error => {
                console.error('Error making API call:', error);
              });
      }

      useEffect(() => {
        const fetchPost = async () => {
            const p = await getPost()
            setPost(p)
        }
        fetchPost()
      },[])

    return (
        <>      
        {post ? (
            <div className="custom-margin2">
            <div className="post container-lg">
                <div className="row">
                    <div className="col-12 col-md-8 col-lg-9 mb-3">
                            <h4><b>{post[0].fields.title}</b></h4>
                            <a href="" style={{textDecoration:'none'}}><span style={{color: 'blue'}}>{ post[0].fields.poster}</span></a> a <a href="" style={{textDecoration: 'none'}}><span
                                style={{color: 'orange'}}>{ post[0].fields.community }</span></a> • { post[0].fields.created_at }
                        <article className="col-12 card my-2 p-2" id="postContent">
                            <div className="md-div">
                                <p>{ post[0].fields.description }</p>
                            </div>
                        </article>
                        <div className="row px-4">
                            <div className="col-auto mr-2">
                                <a href="" className="link"><FontAwesomeIcon icon={faComment} /></a>
                            </div>
                            <div className="col-auto mr-2">
                                <a href="" className="link"><FontAwesomeIcon icon={faArrowUp} /></a>
                            </div>
                            <div className="col-auto">
                                <p className="mr-2">
                                    {post[0].fields.totalVotes}
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
                </div>
            </div>
        </div>
        ) : (
            <p>Cargando.....</p>
        )}
        <CommentsPost id={postId}/>
        </>

        
    )
}