import React, { useState, useEffect } from 'react';
import '../styles/posts.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faArrowUp, faArrowDown, faStar, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from 'react-bootstrap';

export function Posts() {
  const [posts, setPosts] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState('Nou'); // Default value
  const [selectedButton, setSelectedButton] = useState('ToT'); // Default value
  const [messages, setMessages] = useState([]);

  function getPosts(order, button) {
    return fetch(`https://apiprogrammingdev.onrender.com/posts?Tipus_Ordenacio=${order}&Filtre=${button}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
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
    const fetchPosts = async () => {
      const publis = await getPosts(selectedOrder, selectedButton);
      setPosts(publis);
    };
    fetchPosts();
  }, [selectedOrder, selectedButton]);

  // Handle order change
  const handleOrderChange = (eventKey) => {
    setSelectedOrder(eventKey);
  };

  // Handle button click
  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  return (
    <div className='form-box'>
        {/* Display messages */}
        {messages.map((message, index) => (
        <div key={index} className="alert alert-danger" role="alert">
            {message}
        </div>
        ))}

        {/* Dropdown menu */}
        <Dropdown onSelect={handleOrderChange} className="mb-3">
            <Dropdown.Toggle variant="light" id="order-dropdown">
                {selectedOrder}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item eventKey="Nou">Nou</Dropdown.Item>
                <Dropdown.Item eventKey="Antic">Antic</Dropdown.Item>
                <Dropdown.Item eventKey="Mes Votat">Mes Votat</Dropdown.Item>
                <Dropdown.Item eventKey="Mes Comentaris">Mes Comentaris</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

        {/* Buttons */}
        <div className="btn-group" role="group" aria-label="Basic example">
            <button className="btn btn-secondary rareButton" onClick={() => handleButtonClick('Subscrit')}>Subscrit</button>
            <button className="btn btn-secondary rareButton" onClick={() => handleButtonClick('Tot')}>Tot</button>
        </div>

        {posts.length > 0 ? (
            posts.map(p => (
                <div key={p.pk} className="col-12 col-lg-6 offset-lg-3 mb-4">
                    <a style={{color:'black',textDecoration:'none'}} href={`/posts/${p.pk}`}>
                        <h4><b>{p.fields.title}</b></h4>
                    </a>
                </div>
            ))
        ) : (
            <p>No hi ha cap posts per mostrar</p>
        )}
    </div>
  )
}