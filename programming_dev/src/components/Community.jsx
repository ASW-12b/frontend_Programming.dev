import {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import '../styles/viewCommunity.css';
import '../styles/perfil.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faEdit } from '@fortawesome/free-regular-svg-icons'


export function Community () {
    let {communityId} = useParams();
    const [community, setCommunity] = useState(null);
    const [comPosts, setComPosts] = useState([]);
    const [comComments, setComComments] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState('Nou'); // Default value
    const [selectedButton, setSelectedButton] = useState('Publicacions'); // Default value


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

    return (
        <>
            {community ? (
                <div className="custom-margin">
                    <div className="profile-container">
                        <div className="banner-container">
                            {community.banner && <img src={community.banner} alt="Banner" className="banner-image" />}
                        </div>
                        <div className="profile-content">
                            {community.avatar && <img src={community.avatar} alt="Avatar" className="profile-avatar" />}
                            <h1 className="title-user"> {community.name} </h1>
                        </div>
                        <div className="profile-info">
                            <p>{community.id}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Carregant...</p>
            )}
        </>
    );
}
