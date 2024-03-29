import eventImage from '../assets/home.jpg'; // Suponiendo que todas las imágenes son esta por el momento

function EventosScreen() {
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

    return (
        <div className="bg-neutro-tertiary min-h-screen p-4">
            <header className="text-center p-4 text-white flex justify-between items-center">
                <h1 className="text-4xl font-bold">Eventos Univalle</h1>
            </header>
            <div className="container mx-auto py-4">
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
                                <button className="mt-4 bg-neutro-primary hover:bg-[#A7A9AC] text-white py-2 px-4 rounded transition ease-in-out duration-300">
                                    Ver más
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default EventosScreen;
