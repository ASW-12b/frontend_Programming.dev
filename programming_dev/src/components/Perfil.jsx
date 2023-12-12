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


export function Perfil () {
    let {username} = useParams()
    const [user, setUser] = useState(null)
    const [userPosts, setUserPosts] = useState([]);
    const [userComments, setUserComments] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState('Nou'); // Default value
    const [selectedButton, setSelectedButton] = useState('Publicacions'); // Default value

    function getUser(filter, order) {
        const apiUrl = `https://apiprogrammingdev.onrender.com/user/${username}?Filtre=${filter}&Tipus_Ordenacio=${order}`;

        return fetch(apiUrl, {
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

    const formatDate = (dateString) => {
        const formattedDate = new Date(dateString).toLocaleDateString('ca-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        return formattedDate;
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser(selectedOrder, selectedButton);
                const formattedDateJoined = formatDate(userData.date_joined);
                setUser({
                    ...userData,
                    date_joined: formattedDateJoined,
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUser();
    }, [selectedOrder, selectedButton]);

    const handleOrderChange = (eventKey) => {
        setSelectedOrder(eventKey);
    };

    // Handle button click
    const handleButtonClick = (button) => {
        setSelectedButton(button);
    };

    return (
        <>
        {user ? (
            <div className='form-box'>
                <div className="profile-container">
                    <div className="banner-container">
                        {user.banner && <img src={user.banner.url} alt="Banner" className="banner-image"/>}
                    </div>
                    <div className="profile-content">
                        <img src={user.avatar && user.avatar.url} alt="Avatar" className="profile-avatar"/>
                        <h1 className="title-user">
                            {user.first_name} {user.last_name}
                        </h1>

                        <a href='#' className="edit-icon">
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
            </div>
        ) : (
            <p>Carregant...</p>
        )}
        </>
    );
}
