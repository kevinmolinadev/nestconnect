import { useLocation, useNavigate } from 'react-router-dom';
import { Time } from '../../helpers/time';

const RecordItem = ({ item }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

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
        navigate(`${pathname}/${item.id}`)
    }

    return (
        <div onClick={() => handleViewRecord(item)} className="overflow-hidden flex flex-col justify-between rounded-lg shadow-xl hover:cursor-pointer">
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
    );
};

export default RecordItem;
