import { Outlet } from "react-router-dom";
import ListHeader from "./list-header";
import { useContext } from "react";
import { UserContext } from "../../../context/user";
import { SectionContext } from "../../../context/section";
import Section from "../../../components/section";

const List = () => {
    const { user } = useContext(UserContext);
    const { section } = useContext(SectionContext);
    const isModerator = section.id_user === user.id || section.moderators.map(item => item?._id).includes(user.id)
    return (
        <div className="flex flex-col flex-grow relative">
            {
                isModerator
                    ? <>
                        <ListHeader />
                        <Outlet />
                    </>
                    : <Section className={""} />
            }
        </div>
    )
}
export default List;