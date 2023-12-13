import { useState } from 'react';
import '../styles/editPerfil.css'
import {useParams} from "react-router-dom";

const EditProfileForm = ({ user, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        avatar: user.avatar,
        banner: user.banner,
        bio: user.bio,
        firstName: user.first_name,
        lastName: user.last_name,
    });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'avatar' || name === 'banner') {
            // Handle file inputs separately
            setFormData({
                ...formData,
                [name]: files[0],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    let {username} = useParams()

    const handleSave = async (e) => {
        e.preventDefault();

        const formUploadData = new FormData();
        formUploadData.append('first_name', formData.firstName);
        formUploadData.append('last_name', formData.lastName);
        formUploadData.append('bio', formData.bio);
        formUploadData.append('avatar', formData.avatar);
        formUploadData.append('banner', formData.banner);

        try {
            const response = await fetch(`https://apiprogrammingdev.onrender.com/user/${username}`, {
                method: 'PUT',
                headers: {
                    'Authorization': '3ed9e367-519d-4435-8b35-c15d829e528f',
                },
                body: formUploadData,
            });

            if (!response.ok) {
                throw new Error('Error updating profile');
            }

            onSave(formData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="profile-container">
            <h2>Edit Your Profile</h2>
            <form onSubmit={handleSave} className="form-grid">
                <div className="form-field">
                    <label htmlFor="firstName">Nom: </label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="lastName">Cognoms: </label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="bio">Bio: </label>
                    <input
                        type="text"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="avatar">Avatar: </label>
                    {formData.avatar ? (
                        <div>
                            <img src={formData.avatar} className="avatar_edit" alt=""/>
                            <input
                                type="file"
                                name="avatar"
                                onChange={handleInputChange}
                            />
                        </div>
                    ) : (
                        <input
                            type="file"
                            name="avatar"
                            onChange={handleInputChange}
                        />
                    )}

                </div>
                <div className="form-field">
                    <label htmlFor="banner">Banner: </label>
                    {formData.banner ? (
                        <div>
                            <img src={formData.banner} className="banner-edit" alt=""/>
                            <input
                                type="file"
                                name="banner"
                                onChange={handleInputChange}
                            />
                        </div>
                    ) : (
                        <input
                            type="file"
                            name="banner"
                            onChange={handleInputChange}
                        />
                    )}
                </div>
                <div className="button-container">
                    <button type="submit" className="save-button">Save Changes</button>
                    <button type="button" onClick={onCancel} className="cancel-link">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditProfileForm;
