import {useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import '../styles/layout.css'
import "bootstrap/dist/css/bootstrap.min.css";

export function CreatePost() {
    const history = useHistory();
    const [communities,setCommunities] = useState([])
    const [formData, setFormData] = useState({
        url: '',
        title: '',
        description: '',
        comunitat: '',
    });

    const handleInputChange = event => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };


    function getCommunities() {
        return fetch('https://apiprogrammingdev.onrender.com/communities',
        {method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
        },)
              .then(response => response.json())
              .then(data => {
                console.log(data)
                return data
              })
    }
    useEffect(() => {
        const fetchCommunities =  async() => {
            const com = await getCommunities()
            setCommunities(com)
        }
        fetchCommunities()
    },[])

    const handleSubmit = event => {
        event.preventDefault();
        return fetch('https://apiprogrammingdev.onrender.com/posts',
            {method: 'POST',
            mode: 'cors', 
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'3ed9e367-519d-4435-8b35-c15d829e528f'
            }
            },)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                history.push('/');
                return data
            })
            .catch(error => {
                console.error('Error al enviar la solicitud:', error);
              });
         
      };

    return (
        <div className="form-box">
      <div className="row">
        <div className="col-12 col-lg-6 offset-lg-3 mb-4">
          <h1 className="title-form">Crear publicación</h1>
          <form onSubmit={handleSubmit} method="POST">
            <label className="col-sm-2 col-form-label" htmlFor="post-url">
              URL
            </label>
            <div className="col-sm-10">
              <input
                className="form-control mb-3"
                type="url"
                id="post-url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
              ></input>
            </div>

            <label className="col-sm-2 col-form-label" htmlFor="post-title">
              Título
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control false"
                id="post-title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                rows="1"
                minLength="3"
                maxLength="200"
                style={{
                  overflow: 'hidden',
                  overflowWrap: 'break-word',
                  resize: 'none',
                  textAlign: 'start',
                  height: '36px',
                }}
              ></input>
            </div>

            <label className="col-sm-2 col-form-label">Descripción</label>
            <div className="col-sm-10">
              <textarea
                className="form-control"
                name="description"
                id="markdown-textarea-2eMSOam8PPXthWlvRX9I"
                value={formData.description}
                onChange={handleInputChange}
                rows="2"
                maxLength="50000"
                style={{
                  overflow: 'hidden',
                  overflowWrap: 'break-word',
                  resize: 'none',
                  textAlign: 'start',
                  height: '191px',
                  formSizing: 'content',
                }}
                data-tribute="true"
              ></textarea>
            </div>

            <label className="col-sm-2 col-form-label">Comunidad</label>
            <div className="col-sm-10">
              <select className="form-control" name="comunitat" value={formData.comunitat} onChange={handleInputChange} required>
                <option key="default" value="default">Select and option</option>
                {communities.map(c => {
                    return (
                        <option key={c[0].pk} value={c[0].fields.name}>{c[0].fields.name}</option>
                    )
                })}
              </select>
            </div>

            <div className="col-sm-10">
              <br></br>
              <button type="submit" className="btn btn-success">
                Crear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    )
}