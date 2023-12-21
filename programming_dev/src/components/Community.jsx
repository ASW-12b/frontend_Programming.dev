import {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import '../styles/viewComunity.css';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

export function Community () {
    let {communityId} = useParams();
    const [community, setCommunity] = useState(null);
    const [comPosts, setComPosts] = useState([]);
    const [comComments, setComComments] = useState([]);
    const [selectedButton, setSelectedButton] = useState('Publicacions'); // Default value
    const [selectedOrder, setSelectedOrder] = useState('Nou'); // Default value


    const getTokenAndUser = () => {
        const token = localStorage.getItem('token');
        const selectedUser = localStorage.getItem('selectedUser');
        return { token, selectedUser };
    };

    const { token, selectedUser } = getTokenAndUser();

    function getCommunity() {
        return fetch(`https://apiprogrammingdev.onrender.com/communities/${communityId}`, {
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

    useEffect(() => {
        const fetchCommunity = async () => {
            try {
                const comData = await getCommunity();
                setCommunity(comData);
            } catch (error) {
                console.error('Error fetching community data:', error);
            }
        };
        fetchCommunity();
    }, []);

    const handleButtonClick = (button) => {
        setSelectedButton(button);
    };

    const handleOrderChange = (eventKey) => {
        setSelectedOrder(eventKey);
    };

    function getCommentsPosts(filter, order) {
        let apiUrl;

        if (filter === 'Publicacions') {
            apiUrl = `https://apiprogrammingdev.onrender.com/communities/${communityId}/posts`;
        } else if (filter === 'Comentaris') {
            apiUrl = `https://apiprogrammingdev.onrender.com/communities/${communityId}/comments`;
        }

        const url = `${apiUrl}?Filtre=${filter}&Tipus_Ordenacio=${order}`;

        return fetch(url, {
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

    useEffect(() => {
        const fetchCommunityPC = async () => {
            try {
                const comData2 = await getCommentsPosts(selectedButton,selectedOrder);
                if (comData2) {
                    if (selectedButton === 'Comentaris') {
                        setComComments(comData2 || []);
                    } else if (selectedButton === 'Publicacions') {
                        setComPosts(comData2 || []);
                    }
                } else {
                    console.error('No data received from the API');
                }

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchCommunityPC();
    }, [selectedButton, selectedOrder]);

    return (
        <>
            {community ? (
                <div className="custom-margin">
                    <div className="profile-container">
                        <div className="banner-container">
                            {community[0].fields.banner &&
                                <img src={community[0].fields.banner} alt="Banner" className="banner-image"/>}
                        </div>
                        <div className="profile-content">
                            {community[0].fields.avatar &&
                                <img src={community[0].fields.avatar} alt="Avatar" className="profile-avatar"/>}
                            <h1 className="title-user"> {community[0].fields.name} </h1>
                        </div>
                        <div className="profile-info">
                            <p>{community[0].pk}</p>
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
                    </div>

                    {selectedButton === 'Publicacions' ? (
                        comPosts.length > 0 ? (
                            comPosts.map(p => (
                                <div key={p.pk} className="col-12 col-lg-6 offset-lg-3 mb-4">
                                    <a style={{color: 'black', textDecoration: 'none'}} href={`/posts/${p.pk}`}>
                                        <h4><b>{p.fields.title}</b></h4>
                                    </a>
                                    <div className="row px-4">
                                        <div className="col-auto mr-2">
                                            <a href="" className="link"><FontAwesomeIcon icon={faComment}/></a>
                                        </div>
                                        <div className="col-auto mr-2">
                                            <p>{p.fields.numComments}</p>
                                        </div>
                                        <div className="col-auto mr-2">
                                            <a href="" className="link"><FontAwesomeIcon icon={faArrowUp}/></a>
                                        </div>
                                        <div className="col-auto">
                                            <p className="mr-2">
                                            </p>
                                        </div>
                                        <div className="col-auto mr-2">
                                            <a href="" className="link"><FontAwesomeIcon icon={faArrowDown}/></a>
                                        </div>
                                        <div className="col-auto mr-2">
                                            <a href="" className="link"><FontAwesomeIcon icon={faStar}/></a>
                                        </div>
                                        {selectedUser === p.fields.poster && (
                                            <div className="dropdown col-auto">
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                                                        &#8942;
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href=""><FontAwesomeIcon icon={faPenToSquare}/>Editar</Dropdown.Item>
                                                        <Dropdown.Item href=""><FontAwesomeIcon icon={faTrashCan}/>Eliminar</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        )}
                                    </div>
                                    <hr className="my-3"></hr>
                                </div>
                            ))
                        ) : (
                            <div className="custom-margin">
                                <p>No hi ha publicacions</p>
                            </div>
                        )

                    ) : selectedButton === 'Comentaris' ? (
                        comComments.length > 0 ? (
                            comComments.map(c => (
                                <div key={c.id} className="col-12 col-lg-6 offset-lg-3 mb-4">
                                    <a style={{color: 'black', textDecoration: 'none'}} href={`/posts/${c.id}`}>
                                        <h4><b>{c.content}</b></h4>
                                    </a>
                                    <div className="row px-4">
                                        <div className="col-auto mr-2">
                                            <a href="" className="link"><FontAwesomeIcon icon={faComment}/></a>
                                        </div>
                                        <div className="col-auto mr-2">
                                            <a href="" className="link"><FontAwesomeIcon icon={faArrowUp}/></a>
                                        </div>
                                        <div className="col-auto">
                                            <p className="mr-2">
                                            </p>
                                        </div>
                                        <div className="col-auto mr-2">
                                            <a href="" className="link"><FontAwesomeIcon icon={faArrowDown}/></a>
                                        </div>
                                        <div className="col-auto mr-2">
                                            <a href="" className="link"><FontAwesomeIcon icon={faStar}/></a>
                                        </div>
                                        {selectedUser === c.commentor && (
                                            <div className="dropdown col-auto">
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                                                        &#8942;
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href=""><FontAwesomeIcon icon={faPenToSquare}/>Editar</Dropdown.Item>
                                                        <Dropdown.Item href=""><FontAwesomeIcon icon={faTrashCan}/>Eliminar</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        )}
                                    </div>
                                    <hr className="my-3"></hr>
                                </div>
                            ))
                        ) : (
                            <div className="custom-margin">
                                <p>No hi ha comentaris</p>
                            </div>
                        )
                    ) : null}
                </div>
            ) : (
                <p>Carregant...</p>
            )}
        </>
    );
}
