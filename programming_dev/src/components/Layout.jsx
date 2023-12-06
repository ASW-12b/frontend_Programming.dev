import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/layout.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'



export function Layout() {
    return (
        <div className="custom-margin">
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="" style={{ marginRight: '10px' }}>programming.dev</a>
                <a className="nav-link" href="" style={{ marginRight: '10px' }}>Comunitats </a>
                <a className="nav-link" href="" style={{ marginRight: '10px' }}>Crear Publicació</a>
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                    <a className="nav-link" style={{ marginRight: '10px' }} href="">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </a>
                    <div className="nav-item dropdown">
                        <ul className="dropdown-menu" aria-labelledby="userDropdown">
                            <li><a className="dropdown-item" href="">El meu Perfil</a></li>
                            <li><a className="dropdown-item" href="">Tancar Sessió</a></li>
                        </ul>
                        <a className="nav-link" href="">Iniciar Sessió</a>
                    </div>
                </div>
            </nav>
        </div>
    )
}
