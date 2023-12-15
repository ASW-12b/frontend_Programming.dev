import { useParams } from 'react-router-dom';
import {useState,useEffect} from 'react'
import '../styles/comunitat.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { Dropdown } from 'react-bootstrap';
import { CommentsPost } from './CommentsPost';

export function Communities () {
    let {communityId} = useParams()
    const [communities, setCommunity] = useState(null)
    const [editing, setEditing] = useState(false)
    const [formData, setFormData] = useState({
        nom: '',
        id: '',
        banner: '',
        avatar: '',
    });

    return (
        <div className="custom-margin">
            <h1>Llista de Comunitats</h1>
            <div>
                <div className="dropdown">
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <a href="#" className="btn btn-secondary cb rareButton2">Subscrit</a>
                        <a href="#" className="btn btn-secondary cb rareButton2">Tot</a>
                    </div>
                    <a href="#" className="btn btn-secondary align-right">Crear Comunitat</a>
                </div>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Subscriptors</th>
                    <th>Publicacions</th>
                    <th>Comentaris</th>
                    <th></th>
                </tr>
                </thead>
            </table>
        </div>
    )
}

