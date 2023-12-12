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
    const [user,setUser] = useState(null)
    const [userPosts, setUserPosts] = useState([]);
    const [userComments, setUserComments] = useState([]);

    function getUser() {
        return fetch(`https://apiprogrammingdev.onrender.com/user/${username}`, {
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
                const userData = await getUser();
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
    }, []);

    return (
        <>
            {user ? (
            <div className="profile-container">
                <div className="banner-container">
                    {user.banner && <img src={user.banner.url} alt="Banner" className="banner-image" />}
                </div>
                <div className="profile-content">
                    <img src={user.avatar && user.avatar.url} alt="Avatar" className="profile-avatar" />
                    <h1 className="title-user">
                        {user.first_name} {user.last_name}
                    </h1>

                        <a href='#' className="edit-icon">
                            <FontAwesomeIcon icon={faEdit} />
                        </a>

                </div>
                <div className="profile-info">
                    <p>@{user.username}</p>
                    <p>{user.bio}</p>
                    <p>
                        <strong>Data de registre:</strong> {user.date_joined}
                    </p>

                </div>
            </div>
            ) : (
                <p>Carregant...</p>
            )}
        </>
    )
}
