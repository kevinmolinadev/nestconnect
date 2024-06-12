import { useLocation, useNavigate } from 'react-router-dom';
import { Time } from '../../helpers/time';
import { memo } from 'react';

const RecordItem = memo(({ item, template: { file, data } }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const formatValue = (value) => {
        if (/^(https:\/\/(docs\.google\.com\/forms\/d\/e\/|forms\.(office|microsoft)\.com\/).*)$/.test(value)) return null;
        if (typeof value === 'boolean') return value ? { value: "Sí" } : { value: "No" };
        if (typeof value === 'number') return { value: value.toString() };
        if (value.startsWith("https://")) return {
            value: (
                <a href={value} target="_blank" className="bg-neutro-tertiary/20 rounded-md px-2 py-1 text-center flex gap-2 justify-center text-white">
                    ver <svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" /><path d="m21 3-9 9" /><path d="M15 3h6v6" /></svg>
                </a>
            )
        }
        if (/^(\d{4})-(\d{2})-(\d{2})(T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-](\d{2}):(\d{2})))?)?$/.test(value)) return { value: Time.getDateString(value) }
        return { value };
    };

    const handleViewRecord = (item) => {
        sessionStorage.setItem("record", JSON.stringify(item))
        navigate(`${pathname}/${item.id}`)
    }

    return (
        <article onClick={() => handleViewRecord(item)} className="overflow-hidden flex flex-col justify-between rounded-lg shadow-xl hover:cursor-pointer">
            {
                file && <img className="h-48" src={item.data[file.name]} alt="img" />
            }
            <div className="p-4 flex-grow items-start flex flex-col justify-between">
                {
                    data.map((property) => {
                        const valueFormatted = formatValue(item.data[property.name]);
                        if (valueFormatted) {
                            return (
                                <div key={property.name}>
                                    <h3 className="text-sm font-bold text-gray-800">{property.name}</h3>
                                    <p className="text-sm text-gray-600">{valueFormatted.value}</p>
                                </div>
                            );
                        }
                        return null;
                    })
                }
            </div>
        </article>
    );
});

export default RecordItem;