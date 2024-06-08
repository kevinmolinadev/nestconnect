import Header from "../../components/header";
import Footer from "../../components/footer";
import { useQuery } from "@tanstack/react-query";
import { AuthService } from "../../../infraestructure";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/user";

const Home = () => {
    const { user } = useContext(UserContext);
    const query = useQuery({ queryKey: ["visitor"], queryFn: AuthService.visitor, staleTime: 10 * 60 * 1000, enabled: user ? false : true });
    return (
        <>
            <div className="flex flex-col min-h-dvh">
                <Header isSticky={true} isSuccess={query.isSuccess} />
                <Outlet />
                <Footer />
            </div>
        </>
    )
}
export default Home;