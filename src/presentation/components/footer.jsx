import { FaFacebook, FaInstagram, FaUniversity } from 'react-icons/fa';

const Footer = () => {
    const facebookUrl = "https://www.facebook.com/UnivalleBolivia?locale=es_LA";
    const instagramUrl = "https://www.instagram.com/univalle_santacruz?igsh=NjZ3NzBycWl2Nm45";
    const universityUrl = "https://www.univalle.edu/";

    return (
        <footer className="bg-neutro-tertiary">
            <div className="text-white flex max-md:flex-col mx-auto gap-4 justify-between items-center p-4 lg:p-6 lg:justify-center">
                <nav className="flex md:order-1">
                    <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="p-2">
                        <FaFacebook className="text-2xl  lg:text-[28px] hover:scale-125 transition-transform duration-300" />
                    </a>
                    <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="p-2 ml-4">
                        <FaInstagram className="text-2xl lg:text-[28px] hover:scale-125 transition-transform duration-300" />
                    </a>
                    <a href={universityUrl} target="_blank" rel="noopener noreferrer" className="p-2 ml-4">
                        <FaUniversity className="text-2xl lg:text-[28px] hover:scale-125 transition-transform duration-300" />
                    </a>
                </nav>
                <h1 className="text-sm lg:text-base text-center">Copyright © {new Date().getFullYear()} <span className="font-semibold">CodeMinds</span></h1>
            </div>
        </footer>
    );
};

export default Footer;