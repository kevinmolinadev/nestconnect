import { LifeBuoy, Settings, SquareLibrary } from "lucide-react";
import SideBar, { SideBarItem } from "../../components/sidebar";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/user";

const Dashboard = () => {
    const { user } = useContext(UserContext);
    if (!user) return <Navigate to="/" />

    const data = [
        {
            icon: <SquareLibrary size={20} />,
            text: "Eventos"
        },
        {
            icon: <SquareLibrary size={20} />,
            text: "Objetos Perdidos"
        },
    ]
    return (
        <div className="flex">
            <SideBar>
                {data.map((item, index) => <SideBarItem key={index} icon={item.icon} text={item.text} />)}
                <hr className="my-3" />
                <SideBarItem icon={<Settings size={20} />} text="Settings" />
                <SideBarItem icon={<LifeBuoy size={20} />} text="Help" />
            </SideBar>
        </div>
    )
}
export default Dashboard;