import { LifeBuoy, Settings, SquareLibrary } from "lucide-react";
import SideBar, { SideBarItem } from "../../components/sidebar";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../context/user";
import { SectionProvider } from "../../context/section";
import { useQuery } from "@tanstack/react-query";
import { SectionService } from "../../../infraestructure";

const Dashboard = () => {
    const { user } = useContext(UserContext);
    const fetchData = useQuery({ queryKey: ["dashboard", "sections"], queryFn: SectionService.getAll, staleTime: 10 * 60 * 1000, enabled: !!user })
    if (!user) return <Navigate to="/" />

    return (
        <SectionProvider>
            <div className="flex">
                <SideBar>
                    {fetchData.data && fetchData.data.data.map((item, index) => <SideBarItem key={index} context={item} text={item.name} icon={<SquareLibrary size={20} />} />)}
                    <hr className="my-3" />
                    <SideBarItem icon={<Settings size={20} />} text="Settings" />
                    <SideBarItem icon={<LifeBuoy size={20} />} text="Help" />
                </SideBar>
                <Outlet />
            </div>
        </SectionProvider>
    )
}
export default Dashboard;