import React, { useContext, useEffect, useState } from 'react';
import { SectionService } from '../../infraestructure';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ErrorContext } from '../context/error';

let objetos = [
    {
      nombre: "Paisaje de Montaña",
      descripcion: "Vista panorámica de una montaña al amanecer.",
      imageUrl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"
    },
    {
      nombre: "Ciudad Nocturna",
      descripcion: "Luces urbanas iluminando la ciudad de noche.",
    },
    {
      nombre: "Café y Libro",
      descripcion: "Una taza de café junto a un libro abierto.",
      imageUrl: "https://cdn.pixabay.com/photo/2015/07/12/14/26/coffee-842020_960_720.jpg"
    },
    {
      nombre: "Playa Tranquila",
      descripcion: "Arena blanca y agua cristalina bajo un cielo azul.",
      imageUrl: "https://cdn.pixabay.com/photo/2016/01/19/17/39/beach-1149148_960_720.jpg"
    },
    {
      nombre: "Gatito Juguetón",
      descripcion: "Un pequeño gato jugando en el jardín.",
      imageUrl: "https://cdn.pixabay.com/photo/2015/03/27/13/16/cat-694730_960_720.jpg"
    },
    {
      nombre: "Biblioteca Antigua",
      descripcion: "Estantes llenos de libros antiguos en una biblioteca clásica.",
      imageUrl: "https://cdn.pixabay.com/photo/2016/09/08/22/43/books-1655783_960_720.jpg"
    },
    {
      nombre: "Parque Otoñal",
      descripcion: "Hojas caídas cubriendo el camino en un parque durante el otoño.",
      imageUrl: "https://cdn.pixabay.com/photo/2015/12/01/20/28/autumn-1072821_960_720.jpg"
    },
    {
      nombre: "Fuegos Artificiales",
      descripcion: "Espectáculo de fuegos artificiales iluminando el cielo nocturno.",
      imageUrl: "https://cdn.pixabay.com/photo/2016/11/25/23/15/fireworks-1859116_960_720.jpg"
    },
    {
      nombre: "Guitarra Clásica",
      descripcion: "Una guitarra acústica apoyada sobre un fondo de madera.",
      imageUrl: "https://cdn.pixabay.com/photo/2016/11/29/05/55/adult-1867461_960_720.jpg"
    },
    {
      nombre: "Paisaje Nevado",
      descripcion: "Bosque cubierto de nieve en un frío día de invierno.",
      imageUrl: "https://cdn.pixabay.com/photo/2017/02/15/11/15/wintry-2068298_960_720.jpg"
    }
  ];


  const Section = () => {
    const [data, setData] = useState([]);
    const { updateError } = useContext(ErrorContext);
    const { section } = useParams();
    const { isError, isLoading, data: fetchData, error } = useQuery({
        queryKey: ["section", { section }],
        queryFn: () => SectionService.getRecordsById(section),
        staleTime: 10 * 60 * 1000, // 10 minutes
    });

    useEffect(() => {
        if (fetchData) {
            setData(objetos.map(item => ({ data: item })));
        }
    }, [fetchData]);

    if (isLoading) return <div>Cargando ...</div>;
    if (isError) {
        updateInfo(error.message);
    }


    const formatValue = (key, value) => {
        if (typeof value === 'boolean') return value ? {value:"Sí"} : {value:"No"};
        if (typeof value === 'number') return {value:value.toString()};
        if (key.toLowerCase().includes('fecha') && !isNaN(Date.parse(value))) {
            return {value:new Date(value).toLocaleDateString('es-ES', {
                year: 'numeric', month: 'long', day: 'numeric'
            })};
        }
        // Verificación si el valor es una URL de imagen
    const imageUrlRegex = /\.(jpeg|jpg|gif|png|svg)$/i;
    if (typeof value === 'string' && imageUrlRegex.test(value)) {
        return { value, isImage: true };
    }
        return {value};
    };

    return (
        <div className="flex flex-wrap justify-center w-full p-5 bg-white">
            {data.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
                        >
                            <div className="relative bg-white border-2 border-burgundy-600 rounded-lg overflow-hidden">
                                {Object.entries(item.data).map(([key, value], idx) => {
                                    const valueFormatted = formatValue(key, value);
                                    return valueFormatted?.isImage ? (
                                        <div key={idx} className="relative">
                                            <img
                                                src={valueFormatted.value}
                                                alt={key}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                                                <h3 className="text-sm font-bold text-white">
                                                    {key}
                                                </h3>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            key={idx}
                                            className="p-2 bg-white border-t border-gray-200"
                                        >
                                            <h3 className="text-sm font-bold text-gray-800">
                                                {key}:
                                            </h3>
                                            <p className="text-xs text-gray-600">
                                                {valueFormatted.value}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>No hay datos disponibles</div>
            )}
        </div>
    );
};

export default Section;