import { useState, useContext } from 'react';
import { Switch } from '@headlessui/react';
import { RecordService, UploadService } from '../../infraestructure';
import { ErrorContext } from '../context/error';
import { UserContext } from '../context/user';
import { FaQuestionCircle } from 'react-icons/fa';
import { Visibilities } from "../../infraestructure"
import { Time } from '../../helpers/time';


const RenderFieldForm = ({ fields, onClose, onSuccess, section }) => {
  const [formData, setFormData] = useState({});
  const [visibility, setVisibility] = useState("all")
  const { updateError } = useContext(ErrorContext)
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext)


  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const maxSizeInBytes = 3 * 1024 * 1024; //3MB
    let newChanges = {};
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
        newChanges[name] = files[0]
        break;
      case "number":
        newChanges[name] = Number(value);
        break;
      default:
        newChanges[name] = value;
    }
    setFormData({ ...formData, ...newChanges });
  };


  const handleSwitchChange = (name, checked) => {
    setFormData((prevData) => ({ ...prevData, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const date = fields.find((field) => field.type === 'date');
      if (date && formData[date.name]) formData[date.name] = Time.generateDate(formData[date.name]);

      const fileField = fields.find((field) => field.type === 'file');
      if (fileField && formData[fileField.name]) {
        const file = formData[fileField.name];
        setIsLoading(true);
        formData[fileField.name] = await getUrlImage(file);
        setIsLoading(false);
      }

      const payload = {
        id_section: section.id,
        id_campus: user.id_campus,
        data: formData,
        visibility
      }
      await RecordService.create(payload);
      onSuccess();
      onClose();
    } catch (error) {
      updateError(error.message || `Error al realizar la peticion`)
    }
  };

  const getUrlImage = async (file) => {
    const { url } = await UploadService.getURL({ folder: `users/${user.id}/sections/${section.name}/resources`, name: file.name, type: file.type });
    return UploadService.upload(url, file);
  }

  const renderInput = (name, type) => {
    switch (type) {
      case 'datetime':
        return (
          <input
            type={`${type}-local`}
            required
            id={name}
            name={name}
            value={formData[name] || ''}
            onChange={handleChange}
            className="block ml-auto w-3/5 rounded-md p-1 border border-black focus:outline-none"
          />
        );
      case 'checkbox':
        return (
          <Switch
            checked={formData[name] || false}
            onChange={(checked) => handleSwitchChange(name, checked)}
            className={`${formData[name] ? 'bg-neutro-tertiary' : 'bg-gray-200'} ml-auto relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
          >
            <span
              className={`${formData[name] ? 'translate-x-6' : 'translate-x-1'
                }  w-4 h-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        );
      case 'file':
        return (
          <input
            type="file"
            required
            id={name}
            name={name}
            accept="image/*"
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
    <div className="p-3 w-96">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Agregar Registro</h2>
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-4  text-sm ">
        {fields.map(({ name, type }) => (
          <div key={name} className="flex items-center">
            <label htmlFor={name} className="block font-medium text-gray-700 capitalize mr-2">
              {name}
            </label>
            {type === "file" && <span className="ml-2 text-gray-500 cursor-pointer relative group ">
              <FaQuestionCircle />
              <span className="absolute left-0 -bottom-10 z-10 text-xs w-48 p-2 bg-gray-700 text-white rounded opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
                Las imagenes deben tener un peso maximo de 3MB
              </span>
            </span>}
            {renderInput(name, type)}
          </div>
        ))}
        <div className="text-sm flex items-center">
          <p className='block font-medium text-gray-700 capitalize'>Visibilidad</p>
          <span className="ml-2 text-gray-500 cursor-pointer relative group ">
            <FaQuestionCircle />
            <span className="absolute left-0 -bottom-10 text-xs w-48 p-2 bg-gray-700 text-white rounded opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
              Todos: El registro sera visible para todos.
              <br />
              Estudiantes: El registro será visible solo para estudiantes y administradores.
              <br />
              Administración: El registro será visible únicamente para administradores.
            </span>
          </span>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="ml-auto p-1 w-3/5 rounded-md border border-black "
          >
            {Visibilities.map((item, idx) => (
              <option key={idx} value={item.value}>{item.name}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 self-end py-2 bg-neutro-tertiary text-white rounded-md hover:bg-neutro-primary"
        >
          {isLoading ? <div className="flex items-center h-full gap-2">
            Subiendo la imagen
            <div className='w-6 h-6 rounded-full animate-spin border-2 border-r-white border-y-black border-l-black' />
          </div> : "Agregar Registro"}
        </button>
      </form>
    </div>
  );
};

export default RenderFieldForm;