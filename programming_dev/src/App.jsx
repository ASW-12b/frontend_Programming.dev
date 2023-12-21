import {CreatePost} from './components/CreatePost'
import {Index} from './components/Index'
import {Search} from './components/Search'
import {Post} from './components/Post'
import {Communities} from './components/Communities'
import {Community} from './components/Community.jsx'
import {Perfil} from "./components/Perfil";
import {Switch,Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/layout.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import React, { useState} from 'react';
import { Dropdown } from 'react-bootstrap';


function App() {
     const [selectedUser, setSelectedUser] = useState(localStorage.getItem('selectedUser') || 'Usuaris');
     const setTokenAndUser = (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('selectedUser', user);
    };
    const handleUserSelection = (user) => {
        let token = '';
        if (user === 'adrian.contreras.martin_v2') {
            token = 'f54b3557-06d6-4dcb-b95f-d297fd821738';
        } else if (user === 'adrian.contreras.martin') {
            token = '3ed9e367-519d-4435-8b35-c15d829e528f';
        }
        setTokenAndUser(token, user);
    };


  return (
    <>
      <div className="custom-margin">
            <nav className="navbar navbar-expand-lg navbar-light">
                <a href="/posts" className="navbar-brand" style={{ marginRight: '10px' }}>programming.dev</a>
                <a href="/communities" className="nav-link"  style={{ marginRight: '10px' }}>Comunitats </a>
                <a href="/createPost" className="nav-link" style={{ marginRight: '10px' }}>Crear Publicació</a>
                <div style={{display: 'flex', alignItems: 'center', marginLeft: 'auto'}}>
                    <a href="/search" className="nav-link" style={{marginRight: '10px'}}>
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </a>
                    <div className="nav-item dropdown">
                        <Dropdown>
                            <Dropdown.Toggle href="#" id="userDropdown" style={{marginRight: '10px'}}>
                                Usuaris
                            </Dropdown.Toggle>
                            {/* Dropdown Menu */}
                            <Dropdown.Menu aria-labelledby="userDropdown">
                                {['adrian.contreras.martin_v2', 'adrian.contreras.martin'].map((user, index) => (
                                    <Dropdown.Item
                                        key={index}
                                        style={{backgroundColor: localStorage.getItem('selectedUser') === user ? '#c4c4c4' : 'transparent'}}
                                        onClick={() => handleUserSelection(user)}
                                    >
                                        {user}
                                    </Dropdown.Item>
                                ))}
                                {localStorage.getItem('selectedUser') && (
                                    <Dropdown.Item href={`/user/${localStorage.getItem('selectedUser')}`}>
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
            <Route path="/communities/:communityId" component={Community}/>
            <Route path="/user/:username" component={Perfil}/>
            <Route path="/search" component={Search}/>
            <Route exact path="/posts" component={Index}/>
            <Route path="/communities" component={Communities}/>
            <Route path="/" component={Index}/>
        </Switch>
    </>
  )
}

export default App
