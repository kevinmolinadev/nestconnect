import { useContext, useState } from 'react';
import UpdateRecord from './updateRecords';
import { RecordService } from '../../../../infraestructure';
import { SectionContext } from '../../../context/section';
import { Time } from "../../../../helpers/time"

const TableItem = ({ item, index, onUpdate, onDelete }) => {
    const { data, updated_by, created_at, updated_at } = item;
    const [isEditing, setIsEditing] = useState(false);
    const { section } = useContext(SectionContext)

    const handleUpdate = () => {
        setIsEditing(true);
    };

    const handleDelete = async () => {

        await RecordService.delete(item.id, section.id)
        onDelete();
    };

    const formatValue = (value) => {
        if (typeof value === 'boolean') return value ? "Si" : "No";
        if (typeof value === 'number') return value.toString();
        if (isUrlImage(value)) return null;
        if (/^(\d{4})-(\d{2})-(\d{2})(T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-](\d{2}):(\d{2})))?)?$/.test(value)) return Time.getDateString(value)
        return value;
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
        <>
            {isEditing && (
                <UpdateRecord
                    item={item}
                    onUpdate={() => {
                        onUpdate();
                        setIsEditing(false);
                    }}
                    onClose={() => setIsEditing(false)}
                />
            )}
            <tr>
                <td>{index + 1}</td>
                {Object.entries(data).map(([key, value]) => {
                    const formattedValue = formatValue(value);
                    if (!formattedValue) return null;
                    return <td key={key}>{formattedValue}</td>
                })}
                <td>{Time.getDateString(created_at)}</td>
                <td>{Time.getDateString(updated_at)}</td>
                <td>{updated_by.full_name}</td>
                <td className="flex gap-2 justify-end">
                    <svg onClick={handleUpdate} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 hover:cursor-pointer"><path d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" /><path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" /><path d="M8 18h1" /></svg>
                    <svg onClick={handleDelete} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 hover:cursor-pointer text-red-500"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                </td>
            </tr>
        </>
    );
};

export default TableItem;
