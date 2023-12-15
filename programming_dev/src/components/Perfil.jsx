import { useParams } from 'react-router-dom';
import {useState,useEffect} from 'react'
import '../styles/layout.css'
import '../styles/perfil.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { Dropdown } from 'react-bootstrap';
import EditPerfil from "./EditPerfil.jsx";


export function Perfil () {
    let {username} = useParams()
    const [user, setUser] = useState(null)
    const [userPosts, setUserPosts] = useState([]);
    const [userComments, setUserComments] = useState([]);
    const [userDesatsC, setUserDesatsC] = useState([]);
    const [userDesatsP, setUserDesatsP] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState('Nou'); // Default value
    const [selectedButton, setSelectedButton] = useState('Publicacions'); // Default value
    const [editMode, setEditMode] = useState(false);

    function getUserInfo() {
        return fetch(`https://apiprogrammingdev.onrender.com/user/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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

    const formatDate = (dateString) => {
        const formattedDate = new Date(dateString).toLocaleDateString('ca-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        return formattedDate;
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userData = await getUserInfo();
                const formattedDateJoined = formatDate(userData.date_joined);
                setUser({
                    ...userData,
                    date_joined: formattedDateJoined,
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserInfo();
    }, []);

    function getUser(filter, order) {
        let apiUrl;

        if (filter === 'Publicacions') {
            apiUrl = `https://apiprogrammingdev.onrender.com/user/${username}/posts`;
        } else if (filter === 'Comentaris') {
            apiUrl = `https://apiprogrammingdev.onrender.com/user/${username}/comments`;
        } else if (filter === 'Desats') {
            apiUrl = `https://apiprogrammingdev.onrender.com/user/${username}/desats`;
        }

        const url = `${apiUrl}?Filtre=${filter}&Tipus_Ordenacio=${order}`;

        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ${token}',
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
        const fetchUser = async () => {
            try {
                const userData2 = await getUser(selectedButton, selectedOrder);
                if (userData2) {
                    if (selectedButton === 'Comentaris') {
                        setUserComments(userData2.user_comments || []);
                    } else if (selectedButton === 'Publicacions') {
                        setUserPosts(userData2.user_posts || []);
                    } else if (selectedButton === 'Desats') {
                        setUserDesatsP(userData2.liked_posts || []);
                        setUserDesatsC(userData2.liked_comments || []);
                    }
                } else {
                    console.error('No data received from the API');
                }

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUser();
    }, [selectedButton, selectedOrder]);

    const handleOrderChange = (eventKey) => {
        setSelectedOrder(eventKey);
    };

    // Handle button click
    const handleButtonClick = (button) => {
        setSelectedButton(button);
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const updateUser = async () => {
        try {
            const response = await fetch(`https://apiprogrammingdev.onrender.com/user/${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const userData = await response.json();
                const formattedDateJoined = formatDate(userData.date_joined);
                setUser({
                    ...userData,
                    date_joined: formattedDateJoined,
                });
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        updateUser();
    }, []);

    const handleSaveChanges = () => {
        setEditMode(false);
        updateUser();
    };

    return (
        <>
            {editMode ? (
                <EditPerfil user={user} onSave={handleSaveChanges} onCancel={() => setEditMode(false)} />
            ) : (
                <>
                    {user ? (
                        <div className='form-box'>
                            <div className="profile-container">
                                <div className="banner-container">
                                    {user.banner && <img src={user.banner} alt="" className="banner-image"/>}
                                </div>
                                <div className="profile-content">
                                    <img src={user.avatar && user.avatar} alt="" className="profile-avatar"/>
                                    <h1 className="title-user">
                                        {user.first_name} {user.last_name}
                                    </h1>
                                    <a href='#' className="edit-icon" onClick={handleEditClick}>
                                        <FontAwesomeIcon icon={faEdit}/>
                                    </a>
                                </div>
                                <div className="profile-info">
                                    <p>@{user.username}</p>
                                    <p>{user.bio}</p>
                                    <p>
                                        <strong>Data de registre:</strong> {user.date_joined}
                                    </p>
                                    <div className="profile-stats">
                                        <p><strong>{user.num_publicacions}</strong> Publicacions</p>
                                        <p><strong>{user.num_comentaris}</strong> Comentaris</p>
                                        <p><strong>API: {user.api_key}</strong></p>
                                    </div>
                                </div>
                            </div>

                            <div className="btn-group custom-margin" role="group" aria-label="Basic example">
                                {/* Dropdown menu */}
                                <Dropdown onSelect={handleOrderChange} className="mb-3">
                                    <Dropdown.Toggle variant="light" id="order-dropdown">
                                        {selectedOrder}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="Nou">Nou</Dropdown.Item>
                                        <Dropdown.Item eventKey="Antic">Antic</Dropdown.Item>
                                        <Dropdown.Item eventKey="Mes Comentaris">Més Comentaris</Dropdown.Item>
                                        <Dropdown.Item eventKey="Mes popular">Més Popular</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div className="btn-group rareButton" role="group" aria-label="Basic example">
                                <button className={`btn btn-secondary ${selectedButton === 'Publicacions' ? 'selected' : ''}`}
                                        onClick={() => handleButtonClick('Publicacions')}>Publicacions
                                </button>
                                <button className={`btn btn-secondary ${selectedButton === 'Comentaris' ? 'selected' : ''}`}
                                        onClick={() => handleButtonClick('Comentaris')}>Comentaris
                                </button>
                                <button className={`btn btn-secondary ${selectedButton === 'Desats' ? 'selected' : ''}`}
                                        onClick={() => handleButtonClick('Desats')}>Desats
                                </button>
                            </div>

                            {selectedButton === 'Publicacions' ? (
                                userPosts.length > 0 ? (
                                    userPosts.map(p => (
                                        <div key={p.id} className="col-12 col-lg-6 offset-lg-3 mb-4">
                                            <a style={{color:'black',textDecoration:'none'}} href={`/posts/${p.id}`}>
                                                <h4><b>{p.title}</b></h4>
                                            </a>
                                            <div className="row px-4">
                                                <div className="col-auto mr-2">
                                                    <a href="" className="link"><FontAwesomeIcon icon={faComment} /></a>
                                                </div>
                                                <div className="col-auto mr-2">
                                                    <p>{p.numComments}</p>
                                                </div>
                                                <div className="col-auto mr-2">
                                                    <a href="" className="link"><FontAwesomeIcon icon={faArrowUp} /></a>
                                                </div>
                                                <div className="col-auto">
                                                    <p className="mr-2">
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
                                    ))
                                ) : (
                                    <div className="custom-margin">
                                        <p>No ha fet cap publicació</p>
                                    </div>
                                )

                            ) : selectedButton === 'Comentaris' ? (
                                userComments.length > 0 ? (
                                    userComments.map(c => (
                                        <div key={c.id} className="col-12 col-lg-6 offset-lg-3 mb-4">
                                            <a style={{color:'black',textDecoration:'none'}} href={`/posts/${c.id}`}>
                                                <h4><b>{c.content}</b></h4>
                                            </a>
                                            <div className="row px-4">
                                                <div className="col-auto mr-2">
                                                    <a href="" className="link"><FontAwesomeIcon icon={faComment} /></a>
                                                </div>
                                                <div className="col-auto mr-2">
                                                    <a href="" className="link"><FontAwesomeIcon icon={faArrowUp} /></a>
                                                </div>
                                                <div className="col-auto">
                                                    <p className="mr-2">
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
                                    ))
                                ) : (
                                    <div className="custom-margin">
                                        <p>No ha fet cap comentari</p>
                                    </div>
                                )
                            ) : selectedButton === 'Desats' ? (
                                <>
                                {userDesatsP.length > 0 ? (
                                    userDesatsP.map(dp => (
                                        <div key={dp.id} className="col-12 col-lg-6 offset-lg-3 mb-4">
                                            <a style={{color:'black',textDecoration:'none'}} href={`/posts/${dp.id}`}>
                                                <h4><b>{dp.title}</b></h4>
                                            </a>
                                            <div className="row px-4">
                                                <div className="col-auto mr-2">
                                                    <a href="" className="link"><FontAwesomeIcon icon={faComment} /></a>
                                                </div>
                                                <div className="col-auto mr-2">
                                                    <p>{dp.numComments}</p>
                                                </div>
                                                <div className="col-auto mr-2">
                                                    <a href="" className="link"><FontAwesomeIcon icon={faArrowUp} /></a>
                                                </div>
                                                <div className="col-auto">
                                                    <p className="mr-2">
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
                                    ))
                                ) : null}

                                {userDesatsC.length > 0 ? (
                                    userDesatsC.map(dc => (
                                        <div key={dc.id} className="col-12 col-lg-6 offset-lg-3 mb-4">
                                            <a style={{color:'black',textDecoration:'none'}} href={`/posts/${dc.id}`}>
                                                <h4><b>{dc.content}</b></h4>
                                            </a>
                                            <div className="row px-4">
                                                <div className="col-auto mr-2">
                                                    <a href="" className="link"><FontAwesomeIcon icon={faComment} /></a>
                                                </div>
                                                <div className="col-auto mr-2">
                                                    <a href="" className="link"><FontAwesomeIcon icon={faArrowUp} /></a>
                                                </div>
                                                <div className="col-auto">
                                                    <p className="mr-2">
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
                                    ))
                                ) : null}

                                {userDesatsP.length === 0 && userDesatsC.length === 0 ? (
                                    <div className="custom-margin">
                                        <p>No hi ha desats</p>
                                    </div>
                                ) : null}
                                </>
                            ) : null}
                        </div>
                    ) : (
                        <p>Carregant...</p>
                    )}
                </>
            )}
        </>
    )
}
