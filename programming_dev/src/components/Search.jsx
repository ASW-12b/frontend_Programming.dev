import {useEffect, useState} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/cercador.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import "bootstrap/dist/css/bootstrap.min.css";
import {getInfo} from "../controllers/CtrlSearch.js";


export function Search() {
    const [selectedOrder, setSelectedOrder] = useState('Publicacions');
    const [additionalText, setAdditionalText] = useState('Introdueixi un títol pel qual cercar');
    const [textBoxValue, setTextBoxValue] = useState('');
    const [info, setInfo] = useState([]);
    const [messages, setMessages] = useState([]);


    const handleOrderChange = (eventKey) => {
        setSelectedOrder(eventKey);
        setInfo([]);
        setMessages([])
        setTextBoxValue([])
        if (eventKey === 'Publicacions') {
            setAdditionalText('Introdueixi un títol pel qual cercar');
        } else if (eventKey === 'Comentaris') {
            setAdditionalText('Introdueixi un comentari pel qual cercar');
        }
    };


     const handleAdditionalButtonClick = () => {
        getInfo(selectedOrder, textBoxValue)
            .then(result => {
                if (result.isError) {
                    console.error('Error fetching info:', result.message);
                    // Handle the error as needed, e.g., set an error message state
                    setMessages([result.message]);
                    setInfo([]); // Clear the data state in case of an error
                } else {
                    setInfo(result.data);
                    setMessages([]); // Clear the error message state on success
                }
            });
    };

     const renderMessage = (message, index) => (
    <div key={index} className="alert alert-danger" role="alert">
      {message}
    </div>
  );

  const renderComment = (c, index) => (
  <div key={index}>
    <a>{c.content}</a>
  </div>
);

   const renderPost = (p, index) => (
       <div key={index} className="col-12 col-lg-6 offset-lg-3 mb-4 filtre">
               <a style={{color: 'black', textDecoration: 'none'}} href={`/posts/${p.pk}`}>
                   <h4><b>{p.fields && p.fields.title}</b></h4>
               </a>
               <div className="row px-4">
                   <div className="col-auto mr-2">
                       <a href="" className="link"><FontAwesomeIcon icon={faComment}/></a>
                   </div>
                   <div className="col-auto mr-2">
                       <p>{p.fields && p.fields.numComments}</p>
                   </div>
                   <div className="col-auto mr-2">
                       <a href="" className="link"><FontAwesomeIcon icon={faArrowUp}/></a>
                   </div>
                   <div className="col-auto">
                       <p className="mr-2">
                           {p.fields && p.fields.totalVotes}
                       </p>
                   </div>
                   <div className="col-auto mr-2">
                       <a href="" className="link"><FontAwesomeIcon icon={faArrowDown}/></a>
                   </div>
                   <div className="col-auto mr-2">
                       <a href="" className="link"><FontAwesomeIcon icon={faStar}/></a>
                   </div>
                   {/*
                                <div className="dropdown col-auto">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                                            &#8942;
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href={`/posts/${p.pk}`}><FontAwesomeIcon icon={faPenToSquare} />Editar</Dropdown.Item>
                                            <Dropdown.Item href=""><FontAwesomeIcon icon={faTrashCan} />Eliminar</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                    */}
               </div>
               <hr className="my-3"></hr>
       </div>
   );

    return (
        <div className="custom-margin">
            <h1>Buscar</h1>
            <Dropdown onSelect={handleOrderChange}>
                <Dropdown.Toggle id="order-dropdown" className="custom-dropdown-button">
                    {selectedOrder}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item eventKey="Publicacions">Publicacions</Dropdown.Item>
                    <Dropdown.Item eventKey="Comentaris">Comentaris</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <div className="additional-options-container">
                    <p className="additional-options-text">{additionalText}</p>
                    <input className="additional-options-input" type="text" value={textBoxValue} onChange={(e) => setTextBoxValue(e.target.value)}/>
                    <button className="additional-options-button additional-options-button-primary" type="button" onClick={handleAdditionalButtonClick}>Buscar</button>
                </div>

            {/* Display messages or posts or comments */}
            {messages.length > 0 ? (
                messages.map((message, index) => renderMessage(message, index))
            ) : (
                <>
                    {selectedOrder === 'Publicacions' ? (
                            info.map((p, index) => renderPost(p, index))
                    ) : (
                        info.map((c, index) => renderComment(c, index))
                    )}
                </>
            )}
        </div>
    )
}






