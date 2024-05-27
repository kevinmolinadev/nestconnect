import { useState, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LifeBuoy, Settings, SquareLibrary, PlusCircle } from "lucide-react";
import SideBar, { SideBarItem } from "../../components/sidebar";
import { UserContext } from "../../context/user";
import { SectionProvider } from "../../context/section";
import { useQuery } from "@tanstack/react-query";
import { SectionService } from "../../../infraestructure/services/section";
import AddSectionForm from "../../components/AddSectionForm";
import WrapperFormSection from "../../components/wrapper-form-section";

const Dashboard = () => {
    const { user } = useContext(UserContext);
    const fetchData = useQuery({ queryKey: ["dashboard", "sections"], queryFn: SectionService.getAll, staleTime: 10 * 60 * 1000, enabled: !!user });
    const [showForm, setShowForm] = useState(false);

    if (!user) return <Navigate to="/" />

    const handleAddSection = () => {
        setShowForm(true);
    };

    const handleCloseModal = () => {
        setShowForm(false);
    };


    return (
        <SectionProvider>
            <div className="flex">
                <SideBar>
                    <button
                        onClick={handleAddSection}
                        className="flex items-center px-4 py-2 bg-neutro-tertiary text-white rounded-lg hover:bg-neutro-tertiary-dark"
                    >
                        <PlusCircle size={20} className="mr-2" /> Agregar Seccion
                    </button>
                    <hr className="my-3" />

                    {fetchData.data && fetchData.data.data.map((item, index) => (
                        <SideBarItem key={index} context={item} text={item.name} icon={<SquareLibrary size={20} />} />
                    ))}


                    <hr className="my-3" />
                    <SideBarItem icon={<Settings size={20} />} text="Settings" />
                    <SideBarItem icon={<LifeBuoy size={20} />} text="Help" />
                </SideBar>
                <Outlet />
            </div>
            <WrapperFormSection isOpen={showForm} onClose={handleCloseModal}>
                <AddSectionForm onClose={handleCloseModal} OnSuccess={() => fetchData.refetch()} />
            </WrapperFormSection>
        </SectionProvider>
    );
};

export default Dashboard;
