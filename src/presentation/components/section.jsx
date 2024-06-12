import { useContext, useEffect } from 'react';
import { SectionService } from '../../infraestructure';
import { useQuery } from '@tanstack/react-query';
import { ErrorContext } from '../context/error';
import { SectionContext } from '../context/section';
import RecordItem from './record-Item';
import LoadRecords from './load-record';
import EmptyRecords from './empty-records';
import ErrorComponent from './error';
import { Navigate } from 'react-router-dom';

const Section = ({ className }) => {
    const { section } = useContext(SectionContext);
    const { updateError } = useContext(ErrorContext);
    const { isError, isLoading, data: fetchData, error } = useQuery({
        queryKey: ["section", { id: section?.id }],
        queryFn: () => SectionService.getRecordsById(section.id),
        staleTime: 1 * 60 * 1000,
        enabled: section ? true : false
    });
    const template = {
        file: section.fields.find(item => item.type === "file"),
        data: section.fields.filter(item => item.type !== "file")
    }

    useEffect(() => {
        if (isError) updateError(error.message);
    }, [error, isError, updateError])

    if (!section) return <Navigate to="/" />

    if (isLoading) return <LoadRecords />;

    if (isError) return <ErrorComponent />;

    if (fetchData.data.length < 1) return <EmptyRecords message="Esta sección aun no tiene registros disponibles." />

    return (
        <div className="flex-grow p-4">
            <div className={`flex justify-around w-full mx-auto bg-white ${className}`}>
                <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {fetchData.data.map((item, index) => (
                        <RecordItem
                            key={index}
                            item={item}
                            template={template}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Section;