import {useState} from "react";
import '../styles/comunitats.css';
import {createCommunity} from "../controllers/CtrlCommunity.js";
export function Communities () {
    const [selectedButton, setSelectedButton] = useState('Tot');
    const [messages, setMessages] = useState([]);
    const [crear_o_llistar, setCrear_o_llistar] = useState(false);

    const handleButtonClick = (button) => {
        setSelectedButton(button);
    };

    const handleButtonClick2 = (button) => {
        setCrear_o_llistar(true)
    };


    const CreateCommunityForm = () => {
    const [community, setCommunity] = useState({
      id: "",
      name: "",
      avatar: null,
      banner: null,
    });

    const handleButtonClick3 = () => {
        createCommunity(community.id, community.name, community.avatar, community.banner)
            .then(result => {
                if (result.isError) {
                console.error('Error creating community:', result.message);
                // Handle the error as needed, e.g., set an error message state
                setMessages([result.message]);
              } else {
                // Handle the success case, e.g., update the UI or set a success message state
                setInfo(result.data);
                setMessages([]); // Clear the error message state on success
              }
            })
            .catch(error => {
              console.error('API call failed:', error);
              // Handle the error as needed, e.g., set an error message state
              setMessages(['API call failed']);

            });
    };


    const handleChange = (e) => {
      const { name, value, files } = e.target;

      setCommunity((prevCommunity) => ({
        ...prevCommunity,
        [name]: files ? files[0] : value,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      // Handle form submission here (use community state)
      console.log("Form submitted:", community);
    };

    return (
      <div className="form-box">
        <div className="row">
            <div className="col-12 col-lg-6 offset-lg-3 mb-4">
                <h1 className="title-form">Crear Comunitat</h1>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <label htmlFor="community-id" className="col-form-label">ID</label>
                    <div className="row">
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                id="community-id"
                                name="id"
                                value={community.id}
                                onChange={handleChange}
                                required
                                minLength="3"
                                maxLength="20"
                                style={{
                                    overflow: 'hidden',
                                    overflowWrap: 'break-word',
                                    resize: 'none',
                                    textAlign: 'start',
                                    height: '36px'
                                }}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="community-id" className="col-form-label">Nom</label>
                        <div className="row">
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="community-name"
                                    name="name"
                                    value={community.name}
                                    onChange={handleChange}
                                    required
                                    minLength="3"
                                    maxLength="20"
                                    style={{
                                        overflow: 'hidden',
                                        overflowWrap: 'break-word',
                                        resize: 'none',
                                        textAlign: 'start',
                                        height: '36px'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="community-id" className="col-form-label">Avatar</label>
                        <div className="row">
                            <div className="col-sm-10">
                                <input
                                    type="file"
                                    className="form-control false"
                                    id="community-avatar"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="community-id" className="col-form-label">Banner</label>
                        <div className="row">
                            <div className="col-sm-10">
                                <input
                                    type="file"
                                    className="form-control false"
                                    id="community-banner"
                                    name="banner"
                                    accept="image/*"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <br/>
                            <button type="submit" className="btn btn-success" onClick={handleButtonClick3}>Crear</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
    };

    return (
        crear_o_llistar ? (
             <CreateCommunityForm />
        ) : (
            <div className="custom-margin">
                <h1>Llista de Comunitats</h1>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="filtre btn-group" role="group">
                        <button
                            className={`btn btn-secondary rareButton ${selectedButton === 'Subscrit' ? 'selected' : ''}`}
                            onClick={() => handleButtonClick('Subscrit')}>Subscrit
                        </button>
                        <button className={`btn btn-secondary rareButton ${selectedButton === 'Tot' ? 'selected' : ''}`}
                                onClick={() => handleButtonClick('Tot')}>Tot
                        </button>
                    </div>
                    <div className="button-container">
                        <button className="btn btn-secondary stylesss" onClick={handleButtonClick2}>Crear Comunitat
                        </button>
                    </div>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Subscriptors</th>
                        <th>Publicacions</th>
                        <th>Comentaris</th>
                        <th></th>
                    </tr>
                    </thead>
                </table>
            </div>
        )
    )
}
