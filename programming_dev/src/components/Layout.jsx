import "bootstrap/dist/css/bootstrap.min.css";

export function Layout() {
    return (
        <>
            <div className="custom-margin">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <a className="navbar-brand" href="" style={{ marginRight: '10px' }}>programming.dev</a>
                    <a className="nav-link" href="" style={{ marginRight: '10px' }}>Comunitats </a>
                    <a className="nav-link" href="" style={{ marginRight: '10px' }}>Crear Publicació</a>
                    <i className="fas fa-heart" style={{ marginRight: '10px' }}></i>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                        <a className="nav-link" style={{ marginRight: '10px' }} href="">
                            <i className="fas fa-search"></i>
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
        </>
    )
}
