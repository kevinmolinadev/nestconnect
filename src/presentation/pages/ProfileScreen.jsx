import React, { useState } from 'react';

import profileImage from "../assets/profile.jpg";
import backgroundImage from "../assets/background-image.jpg";

function ProfileScreen() {
    const [aboutMeText, setAboutMeText] = useState('');

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
                
                <button style={{
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
                    Editar perfil
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
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Nombre</div><div>Alexander Navarro Navarro</div>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Correo Electronico</div>
                <div>Nna0000452@est.univalle.edu</div>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Tipo de Usuario</div>
                <div>Estudiante</div>
            </div>

            <div style={{ padding: '0 20px' }}>
                <div style={{ marginBottom: '10px', fontSize: '20px', fontWeight: 'bold' }}>
                    PUEDES VER:
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <button style={{
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
                        Becas
                    </button>

                    <button style={{
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

                    <button style={{
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
            </div>

            <div style={{
                backgroundColor: '#522B46',
                height: '100px',
                width: '100%',
                position: 'absolute',
                bottom: 0,
                }}>
                </div>
                </div>
                );
                }
                
export default ProfileScreen;