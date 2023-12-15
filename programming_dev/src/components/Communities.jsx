import React, { useState } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faArrowUp, faArrowDown, faStar, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { Dropdown } from 'react-bootstrap';
import { CommentsPost } from './CommentsPost';
import '../styles/comunitat.css';

export function Communities() {
    let { communityId } = useParams();
    const [communities, setCommunity] = useState(null);
    const [editing, setEditing] = useState(false);
    const [create, setCreate] = useState(false);
    const [formData, setFormData] = useState({
        nom: '',
        id: '',
        banner: '',
        avatar: '',
    });

    function handleClick() {
        setCreate(!create);
    }

    return (
        <div className="custom-margin">
            <h1>Llista de Comunitats</h1>
            <div>
                <div className="dropdown">
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <a href="#" className="btn btn-secondary cb rareButton2">
                            Subscrit
                        </a>
                        <a href="#" className="btn btn-secondary cb rareButton2">
                            Tot
                        </a>
                    </div>
                    <a onClick={handleClick} className="btn btn-secondary align-right">
                        Crear Comunitat
                    </a>
                </div>
            </div>

            {!create ? (
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
                    <tbody></tbody>
                </table>
            ) : (
                <div className="form-box">
                    <div className="row">
                        <div className="col-12 col-lg-6 offset-lg-3 mb-4">
                            <h1 className="title-form">Crear Comunitat</h1>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" htmlFor="community-id">
                                    ID
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="community-id"
                                        name="id"
                                        required
                                        minLength="3"
                                        maxLength="20"
                                    />
                                </div>
                            </div>
                            <br></br>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" htmlFor="community-name">
                                    Nom
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="community-name"
                                        name="name"
                                        required
                                        minLength="3"
                                        maxLength="20"
                                    />
                                </div>
                            </div>
                            <br></br>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" htmlFor="community-avatar">
                                    Avatar
                                </label>
                                <div className="col-sm-10">
                                    <input type="file" className="form-control" id="community-avatar" name="avatar" accept="image/*" />
                                </div>
                            </div>
                            <br></br>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" htmlFor="community-banner">
                                    Banner
                                </label>
                                <div className="col-sm-10">
                                    <input type="file" className="form-control" id="community-banner" name="banner" accept="image/*" />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <br />
                                    <button onClick={handleClick} className="btn btn-secondary align-left">
                                        Crear
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
