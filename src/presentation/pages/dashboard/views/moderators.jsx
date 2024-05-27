import { useState } from "react";
import { UserService } from "../../../../infraestructure";
import CardUser from "../../../components/card-user";

const Moderators = () => {
    const [data, setData] = useState([]);

    const handleFilter = async (e) => {
        const value = e.target.value;
        if (!value) {
            setData([])
        } else {
            const result = await UserService.getUsers(value);
            setData(result.data);
        }
    }

    return (
        <div className="absolute inset-0 flex justify-center items-center">
            <div className=" flex flex-col gap-2 bg-white rounded-md border-2 p-4">
                <div>
                    <input
                        onChange={handleFilter}
                        type="text"
                        placeholder="Buscar..."
                        className="px-4 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                {data.length > 0
                    ? (
                        data.map(item => <CardUser key={item.id} profile={item} />)
                    ) : (
                        <p>No se encontraron resultados para{ }</p>
                    )}
            </div>
        </div>
    )
}
export default Moderators;