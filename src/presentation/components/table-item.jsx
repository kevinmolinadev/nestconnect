import { FilePenLine, Trash2 } from "lucide-react";

const TableItem = ({ item, index }) => {
    const { data, updated_by, created_at, updated_at } = item;

    const handleUpdate = (id) => {
        console.log(`Actualizar registro con id: ${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Eliminar registro con id: ${id}`);
    };


    return (
        <tr>
            <td>{index + 1}</td>
            {Object.entries(data).map(([key, value]) => {
                if (new Date(value).toString() !== "Invalid Date") return;
                if (typeof value === 'boolean') value ? 'Sí' : 'No'

                return <td key={key}>{value}</td>
            })}
            <td>{new Date(created_at).toLocaleString()}</td>
            <td>{new Date(updated_at).toLocaleString()}</td>
            <td>{updated_by.full_name}</td>
            <td className="flex gap-2 justify-end">
                <FilePenLine className="hover:cursor-pointer " size={24} onClick={() => handleUpdate(item.id)} />
                <Trash2 className="text-red-500 hover:cursor-pointer " size={24} onClick={() => handleDelete(item.id)} />
            </td>
        </tr>
    );
};

export default TableItem;