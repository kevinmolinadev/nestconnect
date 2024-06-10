import { useState, useContext, useEffect } from "react";
import NoItem from "../../../assets/svg/NoItemsCart.svg"
import { SectionService, UserService } from "../../../../infraestructure";
import CardUser from "../../../components/card-user";
import { SectionContext } from "../../../context/section";
import { ErrorContext } from "../../../context/error";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "../../../context/user";
import { useNavigate } from "react-router-dom";

const Moderators = () => {
  const { credentials } = useContext(UserContext);
  const { section } = useContext(SectionContext);
  const { updateError } = useContext(ErrorContext)
  const { data: { moderators }, refetch } = useQuery({
    queryKey: ["section", `${section.id}`, "moderators"],
    queryFn: () => SectionService.getModerators(section.id),
    initialData: { moderators: section.moderators },
    enabled: credentials.type === "administrator"
  })
  const navigate = useNavigate();
  const [filter, setFilter] = useState({ value: "", data: [] });
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    if (credentials.type && credentials.type !== "administrator") {
      return navigate("/")
    }
  }, [])

  const handleFilter = async (e) => {
    const value = e.target.value
    if (!value) {
      setFilter({ value, data: [] })
    } else {
      const { data } = await UserService.getUsers(value);
      setFilter({ value, data });
    }
  };

  const handleUserSelection = (userId) => {
    setSelectedUsers(prevSelected => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter(id => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
  };

  const handleAddSelectedUsers = async () => {
    if (selectedUsers.length < 1) return updateError("Debe seleccionar al menos a un moderador")
    try {
      await SectionService.addModerators({ moderators: selectedUsers }, section.id);
      setSelectedUsers([]);
      refetch()
    } catch (error) {
      updateError(error.message);
    }
  }

  const handleDeleteModerator = async (id) => {
    if (!id) return updateError("Debe seleccionar un moderador para realizar esta accion");
    try {
      await SectionService.deleteModerators({ moderators: [id] }, section.id);
      refetch();
    } catch (error) {
      updateError(error.message)
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="flex flex-col gap-4 w-full max-w-3xl bg-white">
        <div className="rounded-md overflow-hidden border">
          <div className="p-4 bg-neutro-tertiary border-neutro-tertiary">
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
            {filter.data.length > 0 &&
              <div className="p-4 flex flex-col gap-2 text-sm text-neutro-tertiary">
                {filter.data.map((item, index) => (
                  <div key={index} onClick={() => handleUserSelection(item.id)}>
                    <CardUser isSelected={selectedUsers.includes(item.id)} profile={item} />
                  </div>
                ))}
              </div>
            }
            {filter.data.length === 0 && filter.value.length > 0 && <p className="italic p-4">No se encontraron resultados para {`"${filter.value}"`}</p>}
          </div>
        </div>
        <div className="p-4 rounded-md border shadow-lg flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Moderadores</h2>
          {moderators.length > 0 ? (
            moderators.map((moderator, index) => (
              <CardUser
                key={index}
                profile={moderator}
                isModerator={true}
                onDelete={handleDeleteModerator}
              />
            ))
          ) : (
            <div className="text-center flex flex-col items-center">
              <img className="w-2/5" src={NoItem} alt="moderators" />
              <p>Aun no tienes moderadores para esta seccion</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Moderators;