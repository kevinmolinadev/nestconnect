import { ChevronFirst, ChevronLast, Edit, Trash2 } from "lucide-react";
import logo from "../assets/logo.png";
import { createContext, useContext, useState } from "react";
import { UserContext } from "../context/user"
import ProfileDefault from "./profile-default";
import { useNavigate } from "react-router-dom";
import { SectionContext } from "../context/section";
import { UserService, UploadService } from "../../infraestructure";

const SidebarContext = createContext();

export default function SideBar({ children }) {
  const { user } = useContext(UserContext)
  const { updateSection, section } = useContext(SectionContext)
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState(section?.name);
  const [profileData, setProfileData] = useState(user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMenuClick = (item) => {
    console.log(`Clicked on ${item.name}`);
    if (item.id) {
      updateSection(item);
      navigate(`${item.name}`)
    }
    setActiveItem(item.name);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <aside className="h-screen">
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src={logo}
              className={`overflow-hidden  transition-all ${expanded ? "w-52" : "w-0"
                }`}
            />
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>
          <SidebarContext.Provider value={{ expanded, handleMenuClick, activeItem }}>
            <ul className="flex-1 px-3"> {children}</ul>
          </SidebarContext.Provider>
          <div
            className={`border-t flex items-center p-4 cursor-pointer relative ${expanded ? 'flex-col' : 'justify-center'}`}
            onClick={openModal}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden">
              {profileData.image_url ? <img src={profileData.image_url} className="w-full h-full object-cover" alt="Profile" /> : <ProfileDefault name={profileData.name} />}
            </div>
            {!expanded && (
              <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-neutro-tertiary/40 text-white text-sm invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
                <span className="block">{profileData.email}</span>
                <span className="block">{profileData.name} {profileData.last_name}</span>
              </div>
            )}
            {expanded && (
              <div className="mt-2 text-center">
                <span className="block text-xs text-gray-600">{profileData.email}</span>
                <h4 className="font-semibold">{profileData.name} {profileData.last_name}</h4>
              </div>
            )}
          </div>
        </nav>
      </aside>
      {isModalOpen && (
        <ProfileModal
          profileData={profileData}
          setProfileData={setProfileData}
          closeModal={closeModal}
        />
      )}
    </>
  );
}

export function SideBarItem({ icon, context, text }) {
  const { expanded, handleMenuClick, activeItem } = useContext(SidebarContext);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${text === activeItem
        ? "bg-gradient-to-tr from-neutro-tertiary 200 to-neutro-tertiary 100 text-white"
        : "hover:bg-neutro-tertiary/40 text-gray-primary 600"
        }`}
      onClick={() => {
        handleMenuClick(context || { name: text });
        if (isMobile) {
          setIsHovered(false); // Ocultar el tooltip al hacer clic en dispositivos móviles
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text === activeItem ? (
        <span className="text-white">{icon}</span>
      ) : (
        icon
      )}
      <span
        className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
          } ${text === activeItem ? "text-white" : ""}`}
      >
        {text}
      </span>
      {!expanded && !isMobile && isHovered && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-neutro-tertiary/40 text-white text-sm`}
        >
          {text}
        </div>
      )}
    </li>
  );
}

function ProfileModal({ profileData, setProfileData, closeModal }) {
  const [formData, setFormData] = useState(profileData);
  const { updateUser } = useContext(UserContext);
  const [uploadFile, setUploadFile] = useState(null);
  const isDefaultImage = formData.image_url === null;

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "image_url") {
      const { url } = await UploadService.getURL({ folder: `users/${formData.id}/profile`, name: files[0].name, type: files[0].type })
      setUploadFile({ url, file: files[0] });
      setFormData({
        ...formData,
        [name]: URL.createObjectURL(files[0]),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (uploadFile) {
      UploadService.upload(uploadFile.url, uploadFile.file)
        .then((url) => UserService.update({ image_url: url, name: profileData.name, last_name: profileData.last_name }))
        .then((data) => updateUser(data));
    }
    UserService.update(formData)
      .then((data) => updateUser(data))
    setProfileData(formData);
    closeModal();
  };

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      image_url: null,
    });
  };

  return (
    <div className="absolute z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl mb-4 text-center">Editar Perfil</h2>
        <div className="text-center mb-4 relative">
          <div className="w-24 h-24 rounded-full mx-auto overflow-hidden">
            {formData.image_url ? <img src={formData.image_url} className="w-full h-full object-cover" alt="Profile" /> : <ProfileDefault name={formData.name} />}
          </div>
          <label htmlFor="image" className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-1 cursor-pointer">
            <Edit size={16} />
            <input
              type="file"
              id="image"
              name="image_url"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>
          <button
            type="button"
            onClick={handleRemoveImage}
            disabled={isDefaultImage}
            className={`absolute bottom-0 left-0 bg-white border border-gray-300 rounded-full p-1 cursor-pointer ${isDefaultImage ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            <Trash2 size={16} />
          </button>
        </div>
        <h4 className="font-semibold text-center mb-4">¡Hola, {formData.name} {formData.last_name}!</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Apellido</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-croma-quaternary text-white rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-neutro-tertiary text-white rounded-lg"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}