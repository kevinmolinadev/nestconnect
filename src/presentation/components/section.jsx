import { useContext, useEffect, useState } from 'react';
import { SectionService } from '../../infraestructure';
import { useQuery } from '@tanstack/react-query';
import { ErrorContext } from '../context/error';
import { SectionContext } from '../context/section';
import { useNavigate } from 'react-router-dom';
import { Time } from '../../helpers/time';

const Section = () => {
    const { section } = useContext(SectionContext);
    const { updateError } = useContext(ErrorContext);
    const { isError, isLoading, data: fetchData, error } = useQuery({ queryKey: ["section", { id: section.id }], queryFn: () => SectionService.getRecordsById(section.id), staleTime: 1 * 60 * 1000 });
    const [data, setData] = useState(fetchData?.data || []);
    const navigate = useNavigate();

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

    const formatValue = (value) => {
        if (/^(https:\/\/(docs\.google\.com\/forms\/d\/e\/|forms\.(office|microsoft)\.com\/).*)$/.test(value)) return null;
        if (typeof value === 'boolean') return value ? { value: "Sí" } : { value: "No" };
        if (typeof value === 'number') return { value: value.toString() };
        if (/^(\d{4})-(\d{2})-(\d{2})(T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-](\d{2}):(\d{2})))?)?$/.test(value)) return { value: Time.getDateString(value) }
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

    const handleViewRecord = (item) => {
        sessionStorage.setItem("record", JSON.stringify(item))
        navigate(item.id)
    }

    return (
        <div className="flex-grow p-4">
            <div className="flex justify-around w-full mx-auto bg-white md:w-11/12 lg:w-9/12 my-8">
                {data.length > 0 ? (
                    <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {data.map((item, index) => (
                            <div onClick={() => handleViewRecord(item)} key={index} className="overflow-hidden flex flex-col justify-between rounded-lg shadow-xl hover:cursor-pointer">
                                {
                                    Object.values(item.data).filter(isUrlImage).map((imgUrl, index) => (
                                        <img key={index} src={imgUrl} className="w-full h-48 object-cover object-center" />
                                    ))
                                }
                                <div className="p-4 flex flex-col justify-between gap-0.5 h-full">
                                    {
                                        Object.entries(item.data).filter(([, value]) => !(isUrlImage(value))).map(([key, value], index) => {
                                            const valueFormatted = formatValue(value);
                                            if (!valueFormatted) return null;
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