import { Link, useResolvedPath } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SectionService } from "../../infraestructure";
import { useContext, useState } from "react";
import Logo from "./logo"
import { SectionContext } from "../context/section";

const Header = ({ isSticky, isSuccess }) => {
    const { updateSection } = useContext(SectionContext);
    const [isOpen, setIsOpen] = useState(false);
    const { pathname } = useResolvedPath()
    const { data } = useQuery({ queryKey: ["sections"], queryFn: SectionService.getAll, enabled: isSuccess });

    const handleMenu = () => {
        if (window.innerWidth <= 1024) {
            setIsOpen(!isOpen)
        }
    }

    const handleSection = (item) => {
        updateSection(item);
        handleMenu()
    }
    return (
        <header className={` bg-neutro-tertiary text-white ${isSticky ? "sticky top-0 z-50" : ""}`}>
            <div className="m-auto flex items-center p-2 md:p-3 md:w-11/12 lg:p-3.5 lg:w-9/12">
                <Logo />
                <span onClick={handleMenu} className="ml-auto w-12 max-lg:inline hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                </span>
                <div className={`flex-grow ${isOpen ? "absolute z-20 left-0 right-0 top-0 min-h-dvh bg-black/40" : "max-lg:hidden"}`}>
                    <div className={`max-lg:bg-white max-lg:h-dvh max-lg:flex-col max-lg:text-black max-lg:w-3/5 max-lg:ml-auto max-lg:rounded-s-2xl flex`}>
                        <nav className="max-lg:order-1 max-lg:p-2 flex-grow">
                            <ul className="max-lg:flex-col max-lg:w-full max-lg:items-start max-lg:justify-start max-lg:pl-2 flex flex-grow justify-end items-center w-full h-full">
                                {
                                    data && (
                                        data.data.map((item) => <li key={item.id} onClick={() => handleSection(item)} className="max-lg:flex max-lg:items-center max-lg:gap-2 hover:cursor-pointer">
                                            <Link className="max-lg:py-2 max-lg:text-[17px] md:px-2 lg:px-4 inline-block" to={item.name}>{item.name}</Link>
                                            <span className="max-lg:inline hidden w-6">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" /><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" /><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" /></svg>
                                            </span>
                                        </li>)
                                    )
                                }
                            </ul>
                        </nav>
                        <div className="flex items-center border-b p-2.5 border-neutro-tertiary">
                            {pathname !== "/login" && <Link to={"/login"} onClick={handleMenu} className="max-lg:bg-neutro-tertiary   max-lg:rounded-lg max-lg:p-2.5 max-lg:text-white pb-2 pt-1.5 px-4 text-lg  leading-none border border-white rounded-md transition-colors duration-500 hover:bg-white hover:text-black hover:border-none">Iniciar Sesión</Link>}
                            <span onClick={handleMenu} className="ml-auto w-12 text-neutro-tertiary lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;