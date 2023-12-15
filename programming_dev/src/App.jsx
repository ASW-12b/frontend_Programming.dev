import {CreatePost} from './components/CreatePost'
import {Index} from './components/Index'
import {Search} from './components/Search'
import {Post} from './components/Post'
import {Perfil} from "./components/Perfil";
import {Switch,Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/layout.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';


function App() {
    const [globalToken, setGlobalToken] = useState('');
    const [selectedUser, setSelectedUser] = useState('');


    const handleUserSelection = (user) => {
        let token = '';
        if (user === 'fernando33') {
            token = 'f54b3557-06d6-4dcb-b95f-d297fd821738';
        } else if (user === 'adrian.contreras.martin') {
            token = '3ed9e367-519d-4435-8b35-c15d829e528f';
        }
        setGlobalToken(token);
        setSelectedUser(user);
    }

  return (
    <>
      <div className="custom-margin">
            <nav className="navbar navbar-expand-lg navbar-light">
                <a href="/posts" className="navbar-brand" style={{ marginRight: '10px' }}>programming.dev</a>
                <a href="#" className="nav-link"  style={{ marginRight: '10px' }}>Comunitats </a>
                <a href="/createPost" className="nav-link" style={{ marginRight: '10px' }}>Crear Publicació</a>
                <div style={{display: 'flex', alignItems: 'center', marginLeft: 'auto'}}>
                    <a href="/search" className="nav-link" style={{marginRight: '10px'}}>
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </a>
                    <div className="nav-item dropdown">
                        <Dropdown>
                            <Dropdown.Toggle href="#"
                                id="userDropdown" style={{ marginRight: '10px' }}>
                                Usuaris
                            </Dropdown.Toggle>

                            {/* Dropdown Menu */}
                            <Dropdown.Menu aria-labelledby="userDropdown">
                                <Dropdown.Item style={{ backgroundColor: selectedUser === 'fernando33' ? '#c4c4c4' : 'transparent' }}
                                               onClick={() => handleUserSelection('fernando33')}>fernando33</Dropdown.Item>
                                <Dropdown.Item style={{ backgroundColor: selectedUser === 'adrian.contreras.martin' ? '#c4c4c4' : 'transparent' }}
                                               onClick={() => handleUserSelection('adrian.contreras.martin')}>adrian.contreras.martin</Dropdown.Item>
                                {selectedUser && (
                                    <Dropdown.Item href={`/user/${selectedUser}`}>
                                        El meu perfil
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </nav>
      </div>
        <Switch>
            <Route path="/createPost" component={CreatePost}/>
            <Route path="/posts/:postId" component={Post}/>
            <Route path="/user/:username" component={Perfil}/>
            <Route path="/search" component={Search}/>
            <Route exact path="/posts" component={Index}/>
            <Route path="/" component={Index}/>
        </Switch>
    </>
  )
}

export default App
