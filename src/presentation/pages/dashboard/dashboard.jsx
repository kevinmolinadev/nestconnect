import { LayoutDashboard, Home, StickyNote, Layers, Flag, Calendar, LifeBuoy, Settings } from "lucide-react";
import SideBar, { SideBarItem } from "../../components/sidebar";

const Dashboard = () => {
    return (
    <>
        <div className="flex">
            <SideBar>
                <SideBarItem icon= {<Home size={20}/>} text="Home" alert/>
                <SideBarItem icon= {<LayoutDashboard size={20}/>} text="Dashboard" active/>
                <SideBarItem icon= {<StickyNote size={20} />} text= "Projects" alert/> 
                <SideBarItem icon= {<Calendar size={20}/>} text= "Calendar"/> 
                <SideBarItem icon= {<Layers size={20}/>} text= "Tasks"/>
                <SideBarItem icon= {<Flag size={20}/>} text= "Reporting"/>
                <hr className="my-3"/>
                <SideBarItem icon= {<Settings size={20}/>} text= "Settings"/>
                <SideBarItem icon= {<LifeBuoy size={20}/>} text= "Help"/>
            </SideBar>
            
        </div>
        
    </>
        
    )
}
export default Dashboard;