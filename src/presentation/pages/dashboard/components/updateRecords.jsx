import { useState, useContext } from 'react';
import Modal from 'react-modal';
import { Switch } from '@headlessui/react';
import { FaQuestionCircle } from 'react-icons/fa';
import { RecordService, Visibilities } from '../../../../infraestructure';
import { ErrorContext } from '../../../context/error';
import { SectionContext } from '../../../context/section';

const UpdateRecord = ({ item, onUpdate, onClose }) => {

    const [formData, setFormData] = useState(item.data);
    const { section: { fields } } = useContext(SectionContext);
    const [visibility, setVisibility] = useState(item.visibility || "all");
    const { updateError } = useContext(ErrorContext);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : type === `number` ? +value : value,
        }));
    };

    const handleSwitchChange = (name, checked) => {
        setFormData((prevData) => ({ ...prevData, [name]: checked }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Verificar si el archivo seleccionado es una imagen
            const fileField = fields.find((field) => field.type === 'file');
            if (fileField && formData[fileField.name] && formData[fileField.name] instanceof File) {
                const file = formData[fileField.name];

                if (!file.type.startsWith('image/')) {
                    updateError('El archivo seleccionado debe ser una imagen.');
                    return;
                }
                formData[fileField.name] = file.name;
            } else if (fileField && !formData[fileField.name]) {
                delete formData[fileField.name];
            }

            const payload = {
                id_section: item.id_section,
                data: formData,
                visibility
            };

            await RecordService.update(item.id, payload);
            onUpdate();
            onClose();
        } catch (error) {
            updateError(error.message || 'Error al realizar la petición');
            onClose();
        }
    };

    const renderInput = (name, type) => {
        switch (type) {
            case 'checkbox':
                return (
                    <Switch
                        checked={formData[name] || false}
                        onChange={(checked) => handleSwitchChange(name, checked)}
                        className={`${formData[name] ? 'bg-neutro-tertiary' : 'bg-gray-200'} ml-auto relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
                    >
                        <span className={`${formData[name] ? 'translate-x-6' : 'translate-x-1'} w-4 h-4 transform bg-white rounded-full transition-transform`} />
                    </Switch>
                );
            case 'file':
                return (
                    <input
                        type={type}
                        id={name}
                        name={name}
                        accept="image/*"
                        onChange={handleChange}
                        className="block ml-auto w-3/5 rounded-md p-1 border border-black focus:outline-none"
                    />
                );
            case 'date':
                return (
                    <input
                        type={type}
                        required
                        id={name}
                        name={name}
                        value={new Date(formData[name]).toISOString().split('T')[0] || ''}
                        onChange={handleChange}
                        className="block ml-auto w-3/5 rounded-md p-1 border border-black focus:outline-none"
                    />
                );
            case 'datetime':
                return (
                    <input
                        type={`${type}-local`}
                        required
                        id={name}
                        name={name}
                        value={new Date(formData[name]).toISOString().slice(0, 16)}
                        onChange={handleChange}
                        className="block ml-auto w-3/5 rounded-md p-1 border border-black focus:outline-none"
                    />
                );
            default:
                return (
                    <input
                        type={type}
                        required
                        id={name}
                        name={name}
                        value={formData[name] || ''}
                        onChange={handleChange}
                        className="block ml-auto w-3/5 rounded-md p-1 border border-black focus:outline-none"
                    />
                );
        }
    };

    return (
        <Modal
            isOpen={true}
            onRequestClose={onClose}
            contentLabel="Actualizar Registro"
            className="fixed inset-0 flex items-center justify-center z-50"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Actualizar Registro</h2>
                    <button
                        type="button"
                        className="text-gray-400 hover:text-gray-600"
                        onClick={onClose}
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm">
                    {fields.map(({ name, type }) => (
                        <div key={name} className="flex items-center">
                            <label htmlFor={name} className="block font-medium text-gray-700 capitalize mr-2">
                                {name}
                            </label>
                            {renderInput(name, type)}
                        </div>
                    ))}
                    <div className="text-sm flex items-center">
                        <p className='block font-medium text-gray-700 capitalize'>Visibilidad</p>
                        <span className="ml-2 text-gray-500 cursor-pointer relative group ">
                            <FaQuestionCircle />
                            <span className="absolute left-0 -bottom-10 text-xs w-48 p-2 bg-gray-700 text-white rounded opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
                                Todos: El registro será visible para todos.
                                <br />
                                Estudiantes: El registro será visible solo para estudiantes y administradores.
                                <br />
                                Administración: El registro será visible únicamente para administradores.
                            </span>
                        </span>
                        <select
                            value={visibility}
                            onChange={(e) => setVisibility(e.target.value)}
                            className="ml-auto p-1 w-3/5 rounded-md border border-black"
                        >
                            {Visibilities.map((item, idx) => (
                                <option key={idx} value={item.value}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="px-4 self-end py-2 bg-neutro-tertiary text-white rounded-md hover:bg-neutro-primary"
                    >
                        Actualizar Registro
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default UpdateRecord;