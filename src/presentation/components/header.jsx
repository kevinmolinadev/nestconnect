import { IoMenu, IoClose, IoLayers } from "react-icons/io5";
import { Link, useResolvedPath } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SectionService } from "../../infraestructure";
import { useState } from "react";
import Logo from "./logo"
const Header = ({ isSticky, isSuccess }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { pathname } = useResolvedPath()
    const { data } = useQuery({ queryKey: ["sections"], queryFn: SectionService.getAll, enabled: isSuccess });

    const handleMenu = () => {
        if (window.innerWidth <= 1024) {
            setIsOpen(!isOpen)
        }
    }
    console.log(data)
    return (
        <header className={` bg-neutro-tertiary text-white ${isSticky ? "sticky top-0 z-50" : ""}`}>
            <div className="m-auto flex items-center p-2 md:p-3 md:w-11/12 lg:p-3.5 lg:w-9/12">
                <Logo />
                <IoMenu onClick={handleMenu} className="ml-auto text-5xl max-lg:inline hidden" />
                <div className={`flex-grow ${isOpen ? "absolute z-20 left-0 right-0 top-0 min-h-dvh bg-black/40" : "max-lg:hidden"}`}>
                    <div className={`max-lg:bg-white max-lg:h-dvh max-lg:flex-col max-lg:text-black max-lg:w-3/5 max-lg:ml-auto max-lg:rounded-s-2xl flex`}>
                        <nav className="max-lg:order-1 max-lg:p-2 flex-grow">
                            <ul className="max-lg:flex-col max-lg:w-full max-lg:items-start max-lg:justify-start max-lg:pl-2 flex flex-grow justify-end items-center w-full h-full">
                                {
                                    data && (
                                        data.data.map((item) => <li key={item.id} className="max-lg:flex max-lg:items-center max-lg:gap-2">
                                            <Link className="max-lg:py-2 max-lg:text-[17px] md:px-2 lg:px-4 inline-block" to={item.name}>{item.name}</Link>
                                            <IoLayers className="max-lg:inline hidden text-2xl" />
                                        </li>)
                                    )
                                }
                            </ul>
                        </nav>
                        <div className="flex items-center border-b p-2.5 border-neutro-tertiary">
                            {pathname !== "/login" && <Link to={"/login"} onClick={handleMenu} className="max-lg:bg-neutro-tertiary   max-lg:rounded-lg max-lg:p-2.5 max-lg:text-white pb-2 pt-1.5 px-4 text-lg  leading-none border border-white rounded-md transition-colors duration-500 hover:bg-white hover:text-black hover:border-none">Iniciar Sesión</Link>}
                            <IoClose onClick={handleMenu} className="ml-auto text-5xl text-neutro-tertiary lg:hidden" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;