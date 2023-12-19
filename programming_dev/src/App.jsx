import {CreatePost} from './components/CreatePost'
import {Index} from './components/Index'
import {Search} from './components/Search'
import {Post} from './components/Post'
import {Communities} from './components/Communities'
import {Switch,Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/layout.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'




function App() {
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
                        <ul className="dropdown-menu" aria-labelledby="userDropdown">
                            <li><a href="#" className="dropdown-item">El meu Perfil</a></li>
                            <li><a href="#" className="dropdown-item">Tancar Sessió</a></li>
                        </ul>
                        <a href="#" className="nav-link">Iniciar Sessió</a>
                    </div>
                </div>
            </nav>
      </div>
        <Switch>
            <Route path="/createPost" component={CreatePost}/>
            <Route path="/posts/:postId" component={Post}/>
            <Route path="/search" component={Search} />
            <Route exact path="/posts" component={Index} />
            <Route path="/communities" component={Communities} />
            <Route path="/" component={Index} />
      </Switch>
    </>
  )
}

export default App
