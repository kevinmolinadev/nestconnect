import { useLocation, useNavigate } from 'react-router-dom';
import { Time } from '../../helpers/time';
import { memo } from 'react';

const RecordItem = memo(({ item, template: { file, data } })=>{
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const formatValue = (value) => {
        if (/^(https:\/\/(docs\.google\.com\/forms\/d\/e\/|forms\.(office|microsoft)\.com\/).*)$/.test(value)) return null;
        if (typeof value === 'boolean') return value ? { value: "Sí" } : { value: "No" };
        if (typeof value === 'number') return { value: value.toString() };
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
            <div className="p-4 flex-grow flex flex-col justify-between">
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