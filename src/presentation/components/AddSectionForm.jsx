import { useState, useEffect } from "react";
import { SectionService } from "../../infraestructure/services/section";
import { FaQuestionCircle, FaTrashAlt } from 'react-icons/fa';
import ToggleSwitch from './ToggleSwitch';

const AddSectionForm = ({ onClose, OnSuccess }) => {
    const [attributes, setAttributes] = useState([{ name: "", type: "text" }]);
    const [types, setTypes] = useState([]);
    const [sectionName, setSectionName] = useState("");
    const [isPublic, setIsPublic] = useState(false);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await SectionService.getTypes();
                setTypes(response || []);
            } catch (error) {
                console.error("Error fetching types", error);
                setTypes([]);
            }
        };
        fetchTypes();
    }, []);

    const handleAttributeChange = (index, event) => {
        const newAttributes = [...attributes];
        newAttributes[index][event.target.name] = event.target.value;
        setAttributes(newAttributes);
    };

    const handleAddAttribute = () => {
        setAttributes([...attributes, { name: "", type: "text" }]);
    };

    const handleRemoveAttribute = (index) => {
        const newAttributes = attributes.filter((_, attrIndex) => attrIndex !== index);
        setAttributes(newAttributes);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = {
            name: sectionName,
            fields: attributes,
            public: isPublic
        };
        try {
            await SectionService.create(payload);
            OnSuccess();
            onClose();
        } catch (error) {
            console.error("Error creating section", error);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className=" mb-1 text-gray-700 flex items-center">
                    Nombre de la Sección:
                    <span className="ml-2 text-gray-500 cursor-pointer relative group">
                        <FaQuestionCircle />
                        <span className="absolute left-0 -bottom-10 text-xs w-48 p-2 bg-gray-700 text-white rounded opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
                            Nombre único de la sección.
                        </span>
                    </span>
                </label>
                <input
                    type="text"
                    name="sectionName"
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                    className="w-full border border-neutro-tertiary px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutro-tertiary"
                    required
                />
            </div>
            {attributes.map((attribute, index) => (
                <div key={index} className="mb-4 flex items-center space-x-2">
                    <input
                        type="text"
                        name="name"
                        value={attribute.name}
                        onChange={(e) => handleAttributeChange(index, e)}
                        className="w-full border border-neutro-tertiary px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutro-tertiary"
                        placeholder="Nombre del Atributo"
                    />
                    <select
                        name="type"
                        value={attribute.type}
                        onChange={(e) => handleAttributeChange(index, e)}
                        className="border border-neutro-tertiary px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutro-tertiary"
                    >
                        {types.map((type, idx) => (
                            <option key={idx} value={type}>{type}</option>
                        ))}
                    </select>
                    <span className="ml-2 text-gray-500 cursor-pointer relative group">
                        <FaQuestionCircle />
                        <span className="absolute left-0 -bottom-20 text-xs w-48 p-2 bg-gray-700 text-white rounded opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
                            Los atributos definen el contenido de la sección. Ejemplos de tipos son: texto, fecha, número. Selecciona el tipo que mejor se ajuste al contenido del atributo.
                        </span>
                    </span>
                    <button
                        type="button"
                        onClick={() => handleRemoveAttribute(index)}
                        className="p-2 bg-neutro-tertiary text-white rounded-lg hover:bg-neutro-tertiary-dark"
                    >
                        <FaTrashAlt />
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={handleAddAttribute}
                className="px-4 py-2 bg-neutro-tertiary text-white rounded-lg hover:bg-neutro-tertiary-dark"
            >
                Agregar Atributo
            </button>
            <div className="gap-2 mt-4 flex items-center">
                <span className="text-gray-700">
                    Público:
                </span>
                <ToggleSwitch isChecked={isPublic} onChange={() => setIsPublic(!isPublic)} />
                <span className="ml-2 text-gray-500 cursor-pointer relative group ">
                    <FaQuestionCircle />
                    <span className="absolute left-0 -bottom-10 text-xs w-48 p-2 bg-gray-700 text-white rounded opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
                        Marque esta casilla si la sección será visible para todos.
                    </span>
                </span>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                    Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-neutro-tertiary text-white rounded-lg hover:bg-neutro-tertiary-dark">Enviar</button>
            </div>
        </form>
    );
};

export default AddSectionForm;
