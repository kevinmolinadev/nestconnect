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


export default ListHeader;