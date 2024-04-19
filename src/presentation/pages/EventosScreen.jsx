import React, { useState } from 'react';
import eventImage from '../assets/home.jpg'; // Asegúrate de que la ruta es correcta
import Header from './Header';

function EventosScreen() {
    const [selectedEvent, setSelectedEvent] = useState(null);

    const events = [
        {
            id: 1,
            title: 'Feria de Ciencias 2024',
            description: 'Explora los últimos avances de nuestros estudiantes y profesores en el campo de la ciencia.',
            date: '15 de marzo de 2024',
            image: eventImage,
            category: 'Ciencia'
        },
        {
            id: 2,
            title: 'Conferencia de Tecnología',
            description: 'Descubre las últimas tendencias en tecnología y cómo están moldeando el futuro.',
            date: '22 de abril de 2024',
            image: eventImage,
            category: 'Tecnología'
        },
        {
            id: 3,
            title: 'Exposición de Arte',
            description: 'Sumérgete en el mundo del arte contemporáneo con nuestra exposición anual.',
            date: '30 de mayo de 2024',
            image: eventImage,
            category: 'Arte'
        },
    ];

    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    const handleClose = () => {
        setSelectedEvent(null);
    };

    return (
        <div className="bg-gradient-to-br from-gray-200 to-gray-400 min-h-screen p-4">
            <Header pageTitle="EVENTOS" />
            <div className="container mx-auto py-4">
                {selectedEvent ? (
                    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-200 bg-opacity-95">
                        <div className="flex items-center justify-center min-h-screen">
                            <div className="bg-white p-8 rounded-lg shadow-xl m-4 max-w-md w-full space-y-4">
                                <h2 className="text-3xl font-bold text-[#522B46] mb-2">{selectedEvent.title}</h2>
                                <p className="text-lg">{selectedEvent.description}</p>
                                <img src={selectedEvent.image} alt={selectedEvent.title} className="max-h-40 w-auto object-cover rounded-lg shadow mx-auto" />
                                <div className="text-sm mt-4">
                                    <p><strong>Date:</strong> {selectedEvent.date}</p>
                                    <p><strong>Category:</strong> {selectedEvent.category}</p>
                                </div>
                                <button onClick={handleClose} className="mt-4 bg-[#522B46] hover:bg-[#3e1f35] text-white py-2 px-4 rounded transition duration-300">
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {events.map((event) => (
                            <div key={event.id} className="overflow-hidden rounded-lg shadow-lg bg-white transform transition duration-500 hover:scale-105">
                                <img src={event.image} alt={event.title} className="w-full h-56 object-cover" />
                                <div className="p-4">
                                    <h3 className="font-bold text-xl mb-2">{event.title}</h3>
                                    <p className="text-gray-700 text-base mb-4">{event.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="bg-neutro-primary text-white text-sm py-1 px-3 rounded-full">{event.category}</span>
                                        <span className="text-sm">{event.date}</span>
                                    </div>
                                    <button onClick={() => handleEventClick(event)} className="mt-4 bg-neutro-primary hover:bg-[#A7A9AC] text-white py-2 px-4 rounded transition ease-in-out duration-300">
                                        Ver más
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default EventosScreen;
