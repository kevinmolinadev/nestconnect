import { useContext, useEffect, useState } from 'react';
import { SectionService } from '../../infraestructure';
import { useQuery } from '@tanstack/react-query';
import { ErrorContext } from '../context/error';
import { SectionContext } from '../context/section';

const Section = () => {
    const { section } = useContext(SectionContext);
    const [data, setData] = useState([]);
    const { updateError } = useContext(ErrorContext);
    const { isError, isLoading, data: fetchData, error } = useQuery({
        queryKey: ["section", { section }],
        queryFn: () => SectionService.getRecordsById(section.id),
        // staleTime: 10 * 60 * 1000, // 10 minutes
    });

    useEffect(() => {
        if (fetchData) {
            setData(fetchData.data);
        }
    }, [fetchData]);

    useEffect(() => {
        if (isError) updateError(error.message);
    }, [error])

    if (isLoading) return <div>Cargando ...</div>;

    if (isError) return <div>Failed to load data :c</div>;

    const formatValue = (key, value) => {
        if (typeof value === 'boolean') return value ? { value: "Sí" } : { value: "No" };
        if (typeof value === 'number') return { value: value.toString() };
        if (key.toLowerCase().includes('fecha') && !isNaN(Date.parse(value))) {
            return {
                value: new Date(value).toLocaleDateString('es-ES', {
                    year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'
                })
            };
        }
        return { value };
    };

    const isUrlImage = (value) => {
        if (typeof value !== 'string') return false;
        try {
            const url = new URL(value);
            const imageUrlRegex = /\.(jpeg|jpg|gif|png|svg)$/i;
            return imageUrlRegex.test(url.pathname);
        } catch (e) {
            return false;
        }
    }

    return (
        <div className="flex-grow p-4">
            <div className="flex justify-around w-full mx-auto bg-white md:w-11/12 lg:w-9/12">
                {data.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {data.map((item, index) => (
                            <div key={index} className="overflow-hidden flex flex-col justify-between rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105">
                                {
                                    Object.values(item.data).filter(isUrlImage).map((imgUrl, index) => (
                                        <div key={index} className="relative">
                                            <img src={imgUrl} alt="img" className="w-full h-48 object-cover" />
                                            <div className="absolute inset-0 p-2 bg-gradient-to-b from-black/50 from-5%" />
                                        </div>
                                    ))
                                }
                                <div className="p-4 flex flex-col gap-2 h-full">
                                    {
                                        Object.entries(item.data).filter(([, value]) => !(isUrlImage(value))).map(([key, value], index) => {
                                            const valueFormatted = formatValue(key, value);
                                            return <div key={index}>
                                                <h3 className="text-sm font-bold text-gray-800">{key}</h3>
                                                <p className="text-sm text-gray-600">{valueFormatted.value}</p>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>No hay datos disponibles</div>
                )}
            </div>
        </div>
    );
};

export default Section;