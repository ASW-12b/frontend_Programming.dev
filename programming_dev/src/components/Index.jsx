import React, { useState, useEffect } from 'react';
import '../styles/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faArrowUp, faArrowDown, faStar, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from 'react-bootstrap';

export function Index() {
    const [info, setInfo] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState('Nou'); // Default value
    const [selectedButton, setSelectedButton] = useState('Tot'); // Default value
    const [selectedButton2, setSelectedButton2] = useState('Publicacions'); // Default value
    const [messages, setMessages] = useState([]);

  function getInfo(order, button, button2) {
    let apiUrl;

    // Define different API URLs based on the button value
    if (button2 === 'Publicacions') {
        apiUrl = 'https://apiprogrammingdev.onrender.com/posts';
    } else if (button2 === 'Comentaris') {
        apiUrl = 'https://apiprogrammingdev.onrender.com/comments'; // Adjust the actual API endpoint for comments
    }

    const url = `${apiUrl}?Tipus_Ordenacio=${order}&Filtre=${button}`;
    console.log('Fetching data from:', url);

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
             console.log('Data fetched:', data);
            if (data.message) {
                setMessages([data.message]);
                return [];
            } else {
                setMessages([]);
            return data;
            }
        });
  }

  useEffect(() => {
    const fetchInfo = () => {
        getInfo(selectedOrder, selectedButton, selectedButton2)
            .then(info => {
                setInfo(info);
            })
        .catch(error => {
            console.error('Error fetching info:', error);
            // Handle the error as needed, e.g., set an error message state
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

  return (
    <div className='form-box'>
        {/* Dropdown menu */}
        <Dropdown onSelect={handleOrderChange} className="mb-3">
            <Dropdown.Toggle variant="light" id="order-dropdown">
                {selectedOrder}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item eventKey="Nou">Nou</Dropdown.Item>
                <Dropdown.Item eventKey="Antic">Antic</Dropdown.Item>
                <Dropdown.Item eventKey="Mes Comentaris">Mes Comentaris</Dropdown.Item>
                <Dropdown.Item eventKey="Mes popular">Mes Popular</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

        {/* Buttons */}
        <div className="btn-group rareButton" role="group" aria-label="Basic example">
            <button className={`btn btn-secondary ${selectedButton === 'Subscrit' ? 'selected' : ''}`} onClick={() => handleButtonClick('Subscrit')}>Subscrit</button>
            <button className={`btn btn-secondary ${selectedButton === 'Tot' ? 'selected' : ''}`} onClick={() => handleButtonClick('Tot')}>Tot</button>
        </div>

        {/* Buttons */}
        <div className="btn-group rareButton" role="group" aria-label="Basic example">
            <button className={`btn btn-secondary ${selectedButton2 === 'Publicacions' ? 'selected' : ''}`} onClick={() => handleButtonClick2('Publicacions')}>Publicacions</button>
            <button className={`btn btn-secondary ${selectedButton2 === 'Comentaris' ? 'selected' : ''}`} onClick={() => handleButtonClick2('Comentaris')}>Comentaris</button>
        </div>

        {/* Display messages or posts or comentaris*/}
        {messages.length > 0 ? (
            messages.map((message, index) => (
            <div key={index} className="alert alert-danger" role="alert">
                {message}
            </div>
            ))
        ) : (
        <>
            {selectedButton2 === 'Publicacions' ? (
            // Render posts
                info.length > 0 ? (
                    info.map(p => (
                    <div key={p.pk} className="col-12 col-lg-6 offset-lg-3 mb-4">
                        <a style={{color: 'black', textDecoration: 'none'}} href={`/posts/${p.pk}`}>
                            <h4><b>{p.fields && p.fields.title}</b></h4>
                        </a>
                    </div>
                    ))
                ) : (
                    <p>No hi ha cap posts per mostrar</p>
                )
            ) : (
                info.length > 0 ? (
                    info.map(c => {
                        return (
                            <div key={c.id}>
                                <a>{c.content}</a>
                            </div>
                        )
                    })
                ) : (
                    <p>No hi cap comentari per mostrar</p>
                ))}
        </>
        )}
    </div>
  )
}