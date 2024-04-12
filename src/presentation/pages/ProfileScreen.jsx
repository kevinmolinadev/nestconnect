import React, { useState, useEffect } from 'react';
import profileImage from "../assets/gatito.jpg";
import backgroundImage from "../assets/background-image.jpg";
import ChatScreen from './ChatScreen';
import EventosScreen from './EventosScreen';

function ProfileScreen({ onLogoutComplete }) {
    const [showChatScreen, setShowChatScreen] = useState(false);
    const [showEventosScreen, setShowEventosScreen] = useState(false);
    const [aboutMeText, setAboutMeText] = useState('');
    const [newName, setNewName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [profileData, setProfileData] = useState({
        name: '',
        lastName: '',
        email: '',
        campusName: '',
    });

    useEffect(() => {
        // Fetch the profile data from the backend
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/v1/user/profile", { credentials: 'include' });
                const data = await response.json();
                if (!response.ok) throw new Error(data.message);
                setProfileData({
                    name: data.name,
                    lastName: data.last_name,
                    email: data.email,
                    campusName: data.id_campus.name,
                });
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchData();
    }, []);

    // Log out the user
    const handleLogout = async () => {
        try {
            await fetch('http://localhost:3000/api/v1/auth/logout', { method: 'GET', credentials: 'include' });
            onLogoutComplete();
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/user/profile', {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newName,
                    last_name: newLastName,
                }), 
            });
            const data = await response.json();
            console.log(data);
            if (!response.ok) throw new Error(data.message);

            setProfileData({
                ...profileData,
                name:data.name,
                lastName: data.last_name,
            });
            setShowEditProfileModal(false);
        } catch (error) {
            console.error('Error saving profile changes:', error);
        }
    };

    const handleChatScreen = () => {
        setShowChatScreen(true);
    };

    const handleEventosScreen = () => {
        setShowEventosScreen(true);
    };

    const handleEditProfileClick = () => {
        setShowEditProfileModal(true);
    };

    if (showChatScreen) {
        return <ChatScreen />;
    }

    if (showEventosScreen) {
        return <EventosScreen />;
    }

    return (
        <div style={{ position: 'relative', width: '100vw', minHeight: '100vh' }}>
            <div style={{
                height: '35vh',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
                backgroundRepeat: 'no-repeat',
            }}>
                <img src={profileImage} alt="Perfil" style={{
                    position: 'absolute',
                    top: '10px',
                    left: '20px',
                    borderRadius: '100%',
                    width: '200px',
                    height: '200px',
                    border: '4px solid white',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }} />
                <button onClick={handleLogout} style={{
                    position: 'absolute',
                    top: '10px',
                    right: '20px',
                    backgroundColor: '#522B46',
                    color: 'white',
                    padding: '10px 15px',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    fontSize: '16px',
                }}>
                    Cerrar Sesion
                </button>
            </div>

            <div style={{ padding: '20px' }}>
                <label htmlFor="aboutMe" style={{ display: 'block', marginBottom: '10px', fontSize: '20px', fontWeight: 'bold' }}>
                    Sobre mí:
                </label>
                <textarea
                    id="aboutMe"
                    value={aboutMeText}
                    onChange={(e) => setAboutMeText(e.target.value)}
                    placeholder="Describe algo sobre ti..."
                    style={{
                        width: '100%',
                        height: '100px',
                        padding: '10px',
                        fontSize: '16px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        boxSizing: 'border-box',
                    }}
                />
            </div>

            <div style={{
                position: 'absolute',
                right: '100px',
                top: 'calc(35vh + 180px)',
                textAlign: 'right',
                width: '200px',
            }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Nombre</div>
                <div>{profileData.name} {profileData.lastName}</div>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Correo Electrónico</div>
                <div>{profileData.email}</div>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Campus</div>
                <div>{profileData.campusName}</div>
            </div>

            <div style={{ padding: '0 20px' }}>
                <div style={{ marginBottom: '10px', fontSize: '20px', fontWeight: 'bold' }}>
                    PUEDES VER:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                <button onClick={handleChatScreen} style={{
        width: '150px',
        padding: '8px',
        marginBottom: '10px',
        backgroundColor: '#522B46',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
    }}>
        Chat Bot
    </button>
    <button onClick={handleEventosScreen} style={{
        width: '150px',
        padding: '8px',
        marginBottom: '10px',
        backgroundColor: '#522B46',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
    }}>
        Eventos de la Universidad
    </button>
    <button onClick={handleEditProfileClick} style={{
        width: '150px',
        padding: '8px',
        backgroundColor: '#522B46',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
    }}>
        Editar Perfil
    </button>
                </div>
            </div>

            {showEditProfileModal && (
    <div style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '1000',
    }}>
        <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '4px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
        }}>
            <div style={{ position: 'relative' }}>
                <svg onClick={() => setShowEditProfileModal(false)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', top: '10px', left: '10px', cursor: 'pointer' }}>
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </div>
            <label htmlFor="newName">Cambiar nombre:</label>
            <input
                id="newName"
                type="text"
                placeholder="Nuevo nombre"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
                id="newLastName"
                type="text"
                placeholder="Nuevo apellido"
                value={newLastName}
                onChange={(e) => setNewLastName(e.target.value)}
                style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <button onClick={handleSaveChanges} style={{ backgroundColor: '#522B46', color: '#FFFFFF', padding: '10px 15px', border: 'none', borderRadius: '4px' }}>
                Guardar cambios
            </button>
        </div>
    </div>
        )}
        </div>
    );
}

export default ProfileScreen;
