import { useState } from "react";
import { UserService } from "../../../../infraestructure";
import CardUser from "../../../components/card-user";

const Moderators = () => {
  const [data, setData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleFilter = async (e) => {
    const value = e.target.value;
    if (!value) {
      setData([]);
    } else {
      const result = await UserService.getUsers(value);
      setData(result.data);
    }
  };

  const handleUserSelection = (userId) => {
    console.log(userId);
    setSelectedUsers(prevSelected => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter(id => id !== userId); // Des-seleccionar si ya está seleccionado
      } else {
        return [...prevSelected, userId]; // Agregar a la selección
      }
    });
};


  const handleAddSelectedUsers = () => {
    if (selectedUsers.length > 0) {
      console.log("IDs de usuarios seleccionados:", selectedUsers);
    }
    setSelectedUsers([]); // Limpiar selección después de agregar
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-neutro-tertiary border-b border-neutro-tertiary border-opacity-50">
          <div className="flex items-center space-x-4">
            <div className="relative flex-grow">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutro-tertiary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <input onChange={handleFilter} type="text" placeholder="Buscar usuarios..." className="w-full pl-10 pr-3 py-2 text-gray-700 bg-white border border-neutro-tertiary rounded-md focus:outline-none focus:ring-2 focus:ring-neutro-tertiary focus:border-transparent" />
            </div>
            <button 
              className="px-4 py-2 bg-neutro-tertiary text-white rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-neutro-tertiary border white -1"
              onClick={handleAddSelectedUsers}
            >
              Agregar
            </button>
          </div>
        </div>
        <div className="divide-y divide-neutro-tertiary divide-opacity-50">
        <div className="px-6 py-4 text-sm text-neutro-tertiary">
                        {data.length > 0
                            ? data.map((item, index) => <div key={index} onClick={() => handleUserSelection(item.id)}><CardUser isSelected={selectedUsers.includes(item.id)} profile={item} /></div>)
                            : <p className="italic">No se encontraron resultados para su búsqueda.</p>}
                    </div>
      </div>
      <div>
        {/* luis */}
      </div>
    </div>
    </div>
  );
};

export default Moderators;