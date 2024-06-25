import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SectionContext } from "../../../context/section";
import { UserContext } from "../../../context/user";

const routes = [
    {
        name: "Registros",
        path: "records",
        type: "public"
    },
    {
        name: "Moderadores",
        path: "moderators",
        type: "private"
    }
]

const ListHeader = () => {
    const { section } = useContext(SectionContext);
    const { user } = useContext(UserContext);
    const { pathname } = useLocation()
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        setSelected(pathname.split("/").at(-1))
    }, [pathname])

    return (
        <div className="flex justify-start  border-b">
            <ul className="flex px-4 gap-4 items-center">
                {routes.filter(item => section.id_user === user.id ? item : item.type === "public").map((item, index) => <li key={index} className={`py-4 ${selected === item.path ? "text-neutro-tertiary font-semibold" : ""}`}><Link to={item.path}>{item.name}</Link></li>)}
            </ul>
        </div>
    );
}


export default ListHeader;