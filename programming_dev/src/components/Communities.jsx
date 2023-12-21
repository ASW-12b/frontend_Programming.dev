import {useEffect, useState} from "react";
import '../styles/comunitats.css';
import {createCommunity} from "../controllers/CtrlCommunity.js";
import {getCommunities} from "../controllers/CtrlCommunities.js";
import {updateSubscrits} from "../controllers/CtrlCommunity.js";
import {deleteSubscrits} from "../controllers/CtrlCommunity.js";
export function Communities () {
    const [selectedButton, setSelectedButton] = useState('Subscrit');
    const [messages, setMessages] = useState([]);
    const [crear_o_llistar, setCrear_o_llistar] = useState(false);
    const [info, setInfo] = useState([]);
    const [subscrits, setSubscrits] = useState([]);


    const handleButtonClick = (button) => {
        setSelectedButton(button);
    };

    const handleButtonClick2 = (button) => {
        setCrear_o_llistar(true)
    };

     const handleButtonClickSubs = (community) => {
        updateSubscrits(community)
            .then(result => {
                if (result.isError) {
                    console.error('Error fetching info:', result.message);
                    setMessages([result.message]);
                } else {
                    setSubscrits(community);
                    setMessages([]);
                }
            });
     };

      const handleButtonClickDesubs = (community) => {
          deleteSubscrits(community)
            .then(result => {
                if (result.isError) {
                    console.error('Error fetching info:', result.message);
                    setMessages([result.message]);
                } else {
                    const updatedSubscrits = subscrits.filter(subscrit => subscrit[0].pk !== community[0].pk);
                    setSubscrits(updatedSubscrits);
                    setMessages([]);
                }
            });
      };

     const SubsOrDeSubs = () => {
          info.forEach((c, communityIndex) => {
            subscrits.forEach((cs, subIndex) => {
                // Perform actions or computations for each subscrit
            });
        });
     };

    useEffect(() => {
    const fetchCommunities = () => {
        getCommunities(selectedButton)
            .then(result => {
                if (result.isError) {
                    console.error('Error fetching info:', result.message);
                    setMessages([result.message]);
                    setInfo([]);
                } else {
                    if (selectedButton == "Subscrit") {
                        console.log('Subscrits:', result.data);
                        setSubscrits(result.data);
                    }
                    setInfo(result.data);
                    setMessages([]);
                }
            });
    };

    fetchCommunities();
}, [selectedButton]);


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
                setMessages([result.message]);
              } else {
                setInfo(result.data);
                setMessages([]);
              }
            })
            .catch(error => {
              console.error('API call failed:', error);
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
             <CreateCommunityForm/>
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
                    <tbody>
                    {info.map((community, index) => (
                        <tr key={index}>
                            <td><a href={`/communities/${community[0].pk}`}>{community[0].fields.name}</a></td>
                            <td>{community[0].fields.subs}</td>
                            <td>{community[0].fields.publicacions}</td>
                            <td>{community[0].fields.comentaris}</td>
                            <td>
                                {subscrits.includes(community) ? (
                                    <button
                                        onClick={() => handleButtonClickDesubs(community)}
                                        className="btn btn-success"
                                    >
                                        Subscrit
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleButtonClickSubs(community)}
                                        className="btn btn-danger"
                                    >
                                        Subscriu-te
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    )
}

