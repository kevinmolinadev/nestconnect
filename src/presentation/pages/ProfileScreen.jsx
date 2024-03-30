import React, { useState, useEffect } from 'react';
import profileImage from "../assets/profile.jpg";
import backgroundImage from "../assets/background-image.jpg";
import ChatScreen from './ChatScreen';
import EventosScreen from './EventosScreen';
import LoginScreen from './LoginScreen';

function ProfileScreen({ onLogoutComplete }) {
    const [showChatScreen, setShowChatScreen] = useState(false);
    const [showEventosScreen, setShowEventosScreen] = useState(false);
    const [aboutMeText, setAboutMeText] = useState('');
    const [profileData, setProfileData] = useState({
        name: '',
        lastName: '',
        email: '',
        campusName: '',
    });

    useEffect(() => {
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

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:3000/api/v1/auth/logout', { method: 'GET', credentials: 'include' });
            onLogoutComplete()
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const handleChatScreen = () => {
        setShowChatScreen(true);
    };

    const handleEventosScreen = () => {
        setShowEventosScreen(true);
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
                    top: '20px',
                    left: '20px',
                    borderRadius: '100%',
                    width: '250px',
                    height: '250px',
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
                    backgroundColor: '#522B46',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                }}>
                    Eventos de la Universidad
                </button>
            </div>

            <div style={{
                backgroundColor: '#522B46',
                height: '50px',
                width: '100%',
                position: 'absolute',
                bottom: 0,
            }}></div>
        </div>
    );
}

export default ProfileScreen;
