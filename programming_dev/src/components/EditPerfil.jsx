import { useState } from 'react';
import '../styles/editPerfil.css'

const EditProfileForm = ({ user, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        avatar: user.avatar && user.avatar.url,
        banner: user.banner && user.banner.url,
        bio: user.bio,
        firstName: user.first_name,
        lastName: user.last_name,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = () => {
        onSave(formData);
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
                    <input
                        type="file"
                        name="avatar"
                        value={formData.avatar}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="banner">Banner: </label>
                    <input
                        type="file"
                        name="banner"
                        value={formData.banner}
                        onChange={handleInputChange}
                    />
                </div>
                {/* Other input fields */}
                <div className="button-container">
                    <button type="submit" className="save-button">Save Changes</button>
                    <button type="button" onClick={onCancel} className="cancel-link">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditProfileForm;
