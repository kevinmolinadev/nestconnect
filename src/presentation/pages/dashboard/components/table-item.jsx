import { useContext, useState } from 'react';
import { FilePenLine, Trash2 } from "lucide-react";
import UpdateForm from './updateRecords';
import { RecordService } from '../../../../infraestructure';
import { SectionContext } from '../../../context/section';

const TableItem = ({ item, index, onUpdate, onDelete }) => {
    const { data, updated_by, created_at, updated_at } = item;
    const [isEditing, setIsEditing] = useState(false);
    const {section} = useContext(SectionContext)

    const handleUpdate = () => {
        setIsEditing(true);
    };

    const handleDelete = async() => {

        await RecordService.delete(item.id,section.id)
        onDelete();
    };

    const formatValue = (value) => {
        if (typeof value === 'boolean') return value ? "Si" : "No";
        if (typeof value === 'number') return value.toString();
        if (!isNaN(Date.parse(value))) return null
        return value;
    };

    return (
        <>
            {isEditing && (
                <UpdateForm
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
                    if (formattedValue === null) return null;
                    return <td key={key}>{formattedValue}</td>
                })}
                <td>{new Date(created_at).toLocaleString()}</td>
                <td>{new Date(updated_at).toLocaleString()}</td>
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
