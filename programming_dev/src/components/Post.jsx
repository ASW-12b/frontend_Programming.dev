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
    const [editing,setEditing] = useState(false)
    const [communities,setCommunities] = useState([])
    const [formData, setFormData] = useState({
        url: '',
        title: '',
        description: '',
        comunitat: '',
    });

    const handleInputChange = event => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        console.log(JSON.stringify(formData.comunitat))
        return fetch(`https://apiprogrammingdev.onrender.com/posts/${postId}`,
            {method: 'PUT',
            mode: 'cors', 
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'3ed9e367-519d-4435-8b35-c15d829e528f'
            }
            },)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setEditing(false)
                return data
            })
            .catch(error => {
                console.error('Error al enviar la solicitud:', error);
              });
         
      };
    function getCommunities() {
        return fetch('https://apiprogrammingdev.onrender.com/communities',
        {method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
        },)
              .then(response => response.json())
              .then(data => {
                console.log(data)
                return data
              })
    }
    useEffect(() => {
        const fetchCommunities =  async() => {
            const com = await getCommunities()
            setCommunities(com)
        }
        fetchCommunities()
    },[])

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
      },[editing])

      

    function handleEdit() {
        setFormData({
            url: post[0].fields.url,
            title: post[0].fields.title,
            description: post[0].fields.description,
            comunitat: post[0].fields.community,
          });
        setEditing(true)
    }
    return (
        <>      
        {post && !editing ? (
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
                                        <Dropdown.Item onClick={handleEdit}><FontAwesomeIcon icon={faPenToSquare} />Editar</Dropdown.Item>
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
            (post && editing) ? (
                <div className="form-box">
      <div className="row">
        <div className="col-12 col-lg-6 offset-lg-3 mb-4">
          <h1 className="title-form">Crear publicación</h1>
          <form onSubmit={handleSubmit} method="POST">
            <label className="col-sm-2 col-form-label" htmlFor="post-url">
              URL
            </label>
            <div className="col-sm-10">
              <input
                className="form-control mb-3"
                type="url"
                id="post-url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
              ></input>
            </div>

            <label className="col-sm-2 col-form-label" htmlFor="post-title">
              Título
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control false"
                id="post-title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                rows="1"
                minLength="3"
                maxLength="200"
                style={{
                  overflow: 'hidden',
                  overflowWrap: 'break-word',
                  resize: 'none',
                  textAlign: 'start',
                  height: '36px',
                }}
              ></input>
            </div>

            <label className="col-sm-2 col-form-label">Descripción</label>
            <div className="col-sm-10">
              <textarea
                className="form-control"
                name="description"
                id="markdown-textarea-2eMSOam8PPXthWlvRX9I"
                value={formData.description}
                onChange={handleInputChange}
                rows="2"
                maxLength="50000"
                style={{
                  overflow: 'hidden',
                  overflowWrap: 'break-word',
                  resize: 'none',
                  textAlign: 'start',
                  height: '191px',
                  formSizing: 'content',
                }}
                data-tribute="true"
              ></textarea>
            </div>

            <label className="col-sm-2 col-form-label">Comunidad</label>
            <div className="col-sm-10">
              <select className="form-control" name="comunitat" value={formData.comunitat} onChange={handleInputChange} required>
                
                {communities.map(c => {
                    return (
                        <option key={c[0].pk} value={c[0].fields.name}>{c[0].fields.name}</option>
                    )
                })}
              </select>
            </div>

            <div className="col-sm-10">
              <br></br>
              <button type="submit" className="btn btn-success">
                Editar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
            ) : (
                <p>Cargando.....</p>
            )
        )}
        <CommentsPost id={postId}/>
        </>

        
    )
}