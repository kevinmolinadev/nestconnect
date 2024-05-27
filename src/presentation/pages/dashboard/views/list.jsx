import { Outlet } from "react-router-dom";
import ListHeader from "./list-header";

const List = () => {
    return (
        <div className="flex flex-col flex-grow relative">
            <ListHeader />
            <Outlet />
        </div>
    )
}
export default List;