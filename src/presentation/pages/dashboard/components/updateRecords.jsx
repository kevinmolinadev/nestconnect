import { useState, useContext } from 'react';
import Modal from 'react-modal';
import { Switch } from '@headlessui/react';
import { RecordService, Visibilities, UploadService } from '../../../../infraestructure';
import { ErrorContext } from '../../../context/error';
import { SectionContext } from '../../../context/section';
import Question from '../../../components/question';
import { UserContext } from '../../../context/user';
import { useMutation } from '@tanstack/react-query';
import { Time } from '../../../../helpers/time';
import Warning from "../../../assets/warning.png";

const UpdateRecord = ({ item, onUpdate, onClose }) => {
    const [formData, setFormData] = useState(item.data);
    const { section } = useContext(SectionContext);
    const { user } = useContext(UserContext);
    const { updateError } = useContext(ErrorContext);
    const [visibility, setVisibility] = useState(item.visibility || "all");
    const { isPending, isError, mutate } = useMutation({ mutationFn: (e) => handleSubmit(e), onSuccess: () => onUpdate(), onError: (e) => updateError(e.message) })

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        const maxSizeInBytes = 3 * 1024 * 1024; //3MB
        switch (type) {
            case "file":
                if (!files[0].type.startsWith('image/')) {
                    updateError('El archivo seleccionado debe ser una imagen')
                    return e.target.value = "";
                }
                if (files[0].size > maxSizeInBytes) {
                    updateError(`El archivo seleccionado no debe superar los ${maxSizeInBytes / 1024 / 1024}MB`)
                    return e.target.value = "";
                }
                setFormData({ ...formData, [`${name}`]: files[0] })
                break;
            case "number":
                setFormData({ ...formData, [`${name}`]: Number(value) })
                break;
            case "time":
                setFormData({ ...formData, [`${name}`]: Time.generateDatefromTime(value) })
                break;
            case "date":
                setFormData({ ...formData, [`${name}`]: Time.generateDate(value) })
                break;
            default:
                setFormData({ ...formData, [`${name}`]: value })
        }
    };

    const handleSwitchChange = (name, checked) => {
        setFormData((prevData) => ({ ...prevData, [name]: checked }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fileField = section.fields.find((field) => field.type === 'file');
        if (fileField && formData[fileField.name] && formData[fileField.name] instanceof File) {
            const file = formData[fileField.name];
            formData[fileField.name] = await getUrlImage(file);
        }
        const payload = {
            id_section: item.id_section,
            data: formData,
            visibility
        };
        await RecordService.update(item.id, payload);
        onClose();
    };

    const getUrlImage = async (file) => {
        const { url } = await UploadService.getUrlForFileToRecord({ id_section: section.id, folder: `users/${user.id}/sections/${section.name}/resources`, name: file.name, type: file.type });
        return UploadService.upload(url, file);
    }

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
                        value={formData[name] ? Time.getFormatedDate(formData[name]) : ""}
                        onChange={handleChange}
                        className="block ml-auto w-3/5 rounded-md p-1 border border-black focus:outline-none"
                    />
                );
            case 'time':
                return (
                    <input
                        type={`${type}`}
                        required
                        id={name}
                        name={name}
                        value={new Date(formData[name]).toLocaleTimeString().slice(0, 5)}
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
                <form onSubmit={(e) => mutate(e)} className="flex flex-col gap-4 text-sm">
                    {section.fields.map(({ name, type }) => (
                        <div key={name} className="flex items-center">
                            <label htmlFor={name} className="block font-medium text-gray-700 capitalize mr-2">
                                {name}
                            </label>
                            {
                                type === "file" && (
                                    <span className="ml-2 text-gray-500 cursor-pointer relative group ">
                                        <Question />
                                        <span className="absolute left-0 -bottom-10 z-10 text-xs w-48 p-2 bg-gray-700 text-white rounded opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
                                            Las imagenes deben tener un peso maximo de 3MB
                                        </span>
                                    </span>
                                )
                            }
                            {renderInput(name, type)}
                        </div>
                    ))}
                    <div className="text-sm flex items-center">
                        <p className='block font-medium text-gray-700 capitalize'>Visibilidad</p>
                        <span className="ml-2 text-gray-500 cursor-pointer relative group ">
                            <Question />
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
                        disabled={isPending}
                        className="px-4 self-end py-2 bg-neutro-tertiary text-white rounded-md hover:bg-neutro-primary"
                    >
                        {isPending || isError ? <div className="flex items-center h-full gap-2">
                            {isPending ? "Subiendo Imagen" : "Actualizar Registro"}
                            {isPending && <div className='w-6 h-6 rounded-full animate-spin border-2 border-r-white border-y-black border-l-black' />}
                            {isError && <img src={Warning} alt="warning" />}
                        </div> : "Actualizar Registro"}
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default UpdateRecord;