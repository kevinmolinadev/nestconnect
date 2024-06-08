import { useContext, useState } from 'react';
import { FilePenLine, Trash2 } from "lucide-react";
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
                <td>{new Date(created_at).toLocaleString("es-ES", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                <td>{new Date(updated_at).toLocaleString("es-ES", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                <td>{updated_by.full_name}</td>
                <td className="flex gap-2 justify-end">
                    <FilePenLine className="hover:cursor-pointer" size={24} onClick={handleUpdate} />
                    <Trash2 className="text-red-500 hover:cursor-pointer" size={24} onClick={handleDelete} />
                </td>
            </tr>
        </>
    );
};

export default TableItem;
