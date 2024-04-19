import React from 'react';
import { FaFacebookF, FaInstagram, FaGraduationCap } from 'react-icons/fa'; // Importa los iconos necesarios

const Header = ({ pageTitle }) => {
  const facebookUrl = "https://www.facebook.com/UnivalleBolivia?locale=es_LA";
  const instagramUrl = "https://www.instagram.com/univalle_santacruz?igsh=NjZ3NzBycWl2Nm45";
  const universityUrl = "https://www.univalle.edu/";

  return (
    <header className="bg-neutro-tertiary text-white flex justify-between items-center p-6">
      <h1 className="text-2xl font-bold">{pageTitle}</h1>
      <nav className="flex">
        <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="p-2">
          <FaFacebookF className="h-6 w-6 text-white hover:text-wine transition duration-300" />
        </a>
        <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="p-2 ml-4">
          <FaInstagram className="h-6 w-6 text-white hover:text-wine transition duration-300" />
        </a>
        <a href={universityUrl} target="_blank" rel="noopener noreferrer" className="p-2 ml-4">
          <FaGraduationCap className="h-6 w-6 text-white hover:text-wine transition duration-300" />
        </a>
      </nav>
    </header>
  );
};

export default Header;
