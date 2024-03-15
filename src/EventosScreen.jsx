// EventsScreen.jsx
import React from 'react';
import eventImage1 from './assets/home.jpg'; // Asegúrate de tener imágenes de eventos en tu carpeta assets
import eventImage2 from './assets/home.jpg';
// Importa más imágenes según sea necesario

function EventosScreen() {
  // Aquí iría la lógica para cargar los eventos, por ahora usaremos datos de ejemplo
  const events = [
    {
      id: 1,
      title: 'Feria de Ciencias 2024',
      description: 'Explora los últimos avances de nuestros estudiantes y profesores.',
      image: eventImage1
    },
    {
      id: 2,
      title: 'Conferencia Internacional de Robótica',
      description: 'Descubre las innovaciones en robótica y su impacto en el futuro.',
      image: eventImage2
    },
    {
        id: 3,
        title: 'Conferencia Internacional de Robótica',
        description: 'Descubre las innovaciones en robótica y su impacto en el futuro.',
        image: eventImage2
    },
    {
        id: 4,
        title: 'Conferencia Internacional de Robótica',
        description: 'Descubre las innovaciones en robótica y su impacto en el futuro.',
        image: eventImage2
    },
  ];

  return (
    <div className="bg-neutro-tertiary min-h-screen p-4">
      <header className="text-center p-4 text-white  flex justify-between items-center">
        <h1 className="text-4xl font-bold">Eventos Univalle</h1>
        <button type="submit" className="bg-neutro-tertiary w-30% p-3 rounded-md hover:bg-[#A7A9AC] transition duration-300 text-white" >HOME PAGE</button>
      </header>
      <div className="bg-white text-black p-4">
        <div className="flex flex-wrap -mx-2">
          {events.map(event => (
            <div key={event.id} className="w-full  md:w-1/5 px-2 mb-4">
              <div className="border  border-gray-200 p-4 rounded-lg bg-neutro-tertiary shadow-lg">
                <h2 className="text-xl font-bold text-white">{event.title}</h2>
                <p className="text-gray-300 mb-2">{event.description}</p>
                <img src={event.image} alt={event.title} className="w-full h-auto rounded-md mb-4" />
                {/* Aquí podrías añadir un enlace o botón para ver más detalles del evento */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventosScreen;
