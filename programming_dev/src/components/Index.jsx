import { useState, useEffect } from 'react';
import '../styles/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown,faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { /*faTrashCan,faPenToSquare ,*/faStar,faComment} from '@fortawesome/free-regular-svg-icons'
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from 'react-bootstrap';
import {getInfo} from '../controllers/CtrlPosts'

export function Index() {
    const [info, setInfo] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState('Nou'); // Default value
    const [selectedButton, setSelectedButton] = useState('Tot'); // Default value
    const [selectedButton2, setSelectedButton2] = useState('Publicacions'); // Default value
    const [messages, setMessages] = useState([]);


    useEffect(() => {
    const fetchInfo = () => {
        getInfo(selectedOrder, selectedButton, selectedButton2)
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

    fetchInfo();
}, [selectedOrder, selectedButton, selectedButton2]);



  // Handle order change
  const handleOrderChange = (eventKey) => {
    setSelectedOrder(eventKey);
  };

  // Handle button click
  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  const handleButtonClick2 = (button) => {
    setSelectedButton2(button);
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
            <div className="container">
                <div className="filtre">
                    <Dropdown onSelect={handleOrderChange}>
                        <Dropdown.Toggle id="order-dropdown" className="custom-dropdown-button">
                            {selectedOrder}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="Nou">Nou</Dropdown.Item>
                            <Dropdown.Item eventKey="Antic">Antic</Dropdown.Item>
                            <Dropdown.Item eventKey="Mes Comentaris">Mes Comentaris</Dropdown.Item>
                            <Dropdown.Item eventKey="Mes popular">Mes Popular</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="filtre btn-group" role="group">
                    <button className={`btn btn-secondary rareButton ${selectedButton === 'Subscrit' ? 'selected' : ''}`} onClick={() => handleButtonClick('Subscrit')}>Subscrit</button>
                    <button className={`btn btn-secondary rareButton ${selectedButton === 'Tot' ? 'selected' : ''}`} onClick={() => handleButtonClick('Tot')}>Tot</button>
                </div>
                <div className="filtre btn-group" role="group">
                    <button className={`btn btn-secondary rareButton ${selectedButton2 === 'Publicacions' ? 'selected' : ''}`} onClick={() => handleButtonClick2('Publicacions')}>Publicacions</button>
                    <button className={`btn btn-secondary rareButton ${selectedButton2 === 'Comentaris' ? 'selected' : ''}`} onClick={() => handleButtonClick2('Comentaris')}>Comentaris</button>
                </div>
            </div>

            {/* Display messages or posts or comments */}
            {messages.length > 0 ? (
                messages.map((message, index) => renderMessage(message, index))
            ) : (
                <>
                    {selectedButton2 === 'Publicacions' ? (
                        info.length > 0 ? (
                            info.map((p, index) => renderPost(p, index))
                        ) : (
                            <p>No hi ha cap posts per mostrar</p>
                        )
                    ) : (
                        info.length > 0 ? (
                            info.map((c, index) => renderComment(c, index))
                        ) : (
                            <p>No hi cap comentari per mostrar</p>
                        )
                    )}
                </>
            )}
        </div>
    )
}