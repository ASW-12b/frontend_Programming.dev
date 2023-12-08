import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/cercador.css';
import '../styles/posts.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import "bootstrap/dist/css/bootstrap.min.css";


export function Search() {
  const [selectedOrder, setSelectedOrder] = useState('');
  const [showAdditionalOptions, setShowAdditionalOptions] = useState(false);
  const [additionalText, setAdditionalText] = useState('');
  const [textBoxValue, setTextBoxValue] = useState('');
  const [posts, setPosts] = useState([]);
  const formChoices = [
    {label: 'Publicacions', value: 'cercapub'},
    {label: 'Comentaris', value: 'cercacom'},
  ];

  const handleOrderChange = (value) => {
    setSelectedOrder(value);
    setShowAdditionalOptions(true);

    // Customize additional text and API call based on the selected option
    if (value === 'cercapub') {
      setAdditionalText('Introdueixi un títol pel qual cercar');
    } else if (value === 'cercacom') {
      setAdditionalText('Introdueixi un comentari pel qual cercar');
    }
  };

  const handleAdditionalButtonClick = () => {
    // Handle button click based on the selected option
    if (selectedOrder === 'cercapub') {
      // Perform API call for Publicacions with the text box value
      fetch(`https://apiprogrammingdev.onrender.com/posts_search?searchText=${textBoxValue}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
          .then(response => response.json())
          .then(data => {
            // Handle the API response for Publicacions
            setPosts(data); // Assuming the API response is an array of posts
          })
          .catch(error => {
            // Handle error
            console.error('Error making API call:', error);
          });
    } else if (selectedOrder === 'cercacom') {
      // Perform API call for Comentaris with the text box value
      fetch(`https://apiprogrammingdev.onrender.com/comments_search?searchText=${textBoxValue}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
          .then(response => response.json())
          .then(data => {
            // Handle the API response for Comentaris
            setPosts(data); // Assuming the API response is an array of posts
          })
          .catch(error => {
            // Handle error
            console.error('Error making API call:', error);
          });
    }
    // Additional actions if needed
  };

  return (
      <div className="custom-margin">
        <h1>Buscar</h1>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="custom-dropdown-button">
            {!selectedOrder ? 'Tipus Cerca' : formChoices.find((choice) => choice.value === selectedOrder)?.label}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {formChoices.map((choice) => (
                <Dropdown.Item
                    key={choice.value}
                    onClick={() => handleOrderChange(choice.value)}
                >
                  {choice.label}
                </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        {showAdditionalOptions && (
            <div className="additional-options-container">
              <p className="additional-options-text">{additionalText}</p>
              <input
                  className="additional-options-input"
                  type="text"
                  value={textBoxValue}
                  onChange={(e) => setTextBoxValue(e.target.value)}
              />
              {/* Apply the new class for the additional button */}
              <button
                  className="additional-options-button additional-options-button-primary"
                  type="button"
                  onClick={handleAdditionalButtonClick}
              >
                Buscar
              </button>
            </div>
        )}

        {/* Display posts from the API response */}
        <div className='form-box'>
          {posts.map(p => {
            return (
                <div key={p.pk} className="col-12 col-lg-6 offset-lg-3 mb-4">
                  <a style={{color: 'black', textDecoration: 'none'}} href="#">
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
                        {p.fields.totalVotes}
                      </p>
                    </div>
                    <div className="col-auto mr-2">
                      <a href="" className="link"><FontAwesomeIcon icon={faArrowDown}/></a>
                    </div>
                    <div className="col-auto mr-2">
                      <a href="" className="link"><FontAwesomeIcon icon={faStar}/></a>
                    </div>
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
                  </div>
                  <hr className="my-3"></hr>
                </div>

            )
          })}
        </div>
      </div>
  )
}






