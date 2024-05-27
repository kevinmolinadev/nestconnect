import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const routes = [
    {
        name: "Registros",
        path: "records"
    },
    {
        name: "Moderadores",
        path: "moderators"
    }
]

const ListHeader = () => {
    const { pathname } = useLocation()
    const [selected, setSelected] = useState(pathname.split("/").at(-1))

    useEffect(() => {
        setSelected(pathname.split("/").at(-1))
    }, [pathname])

    return (
        <div className="flex justify-start  border-b">
            <ul className="flex px-4 gap-4">
                {routes.map((item, index) => <li key={index} className={`py-4 ${selected === item.path ? "text-neutro-tertiary font-semibold" : ""}`}><Link to={item.path}>{item.name}</Link></li>)}
            </ul>
        </div>
    );
}



// const ListHeader = () => {
//     return (
//         <div className="flex justify-start items-stretch p-2 gap-2 border-b border-gray-300">
            // <button className="px-3 bg-neutro-tertiary text-white rounded-md hover:bg-neutro-primary">
            //     <FilePlus2 size={24} />
            // </button>
            // <input
            //     type="text"
            //     placeholder="Buscar..."
            //     className="px-4 py-2 border border-gray-300 rounded-md w-64"
            // />
//             <Modal className=" justify-start" title="Moderadores" message="Los moderadores cumplen la funcion de agregagar o actulizar la infromacio de tu seccion :D">
//                 <Link to="moderators" className="hover:cursor-pointer flex items-center rounded-md px-3 py-2 bg-neutro-tertiary">
//                     <UserRoundPlus className="text-white" size={24} />
//                 </Link>
//             </Modal>
//         </div>
//     );
// }

export default ListHeader;