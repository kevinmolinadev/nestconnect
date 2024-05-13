import Header from "../../components/header";
import Footer from "../../components/footer";
import { useQuery } from "@tanstack/react-query";
import { AuthService } from "../../../infraestructure";
import { Outlet } from "react-router-dom";

const Home = () => {

    const query = useQuery({ queryKey: ["visitor"], queryFn: AuthService.visitor, staleTime: 10 * 60 * 1000 });

    return (
        <>
            <div className="flex flex-col min-h-dvh">
                <Header isSticky={true} handleReques={query.isSuccess} />
                <Outlet />
                <Footer />
            </div>
        </>
    )
}
export default Home;