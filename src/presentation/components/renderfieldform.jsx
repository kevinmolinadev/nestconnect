import React, { useState, useContext } from 'react';
import { Switch } from '@headlessui/react';
import { RecordService } from '../../infraestructure';
import { ErrorContext } from '../context/error';
import { UserContext } from '../context/user';


const RenderFieldForm = ({ fields, onClose, onSuccess, section }) => {
  const [formData, setFormData] = useState({});
  const {updateError } = useContext(ErrorContext)
  const {user} = useContext(UserContext)


  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : type===`number`? +value:value,
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
      if (fileField && formData[fileField.name]) {
        const file = formData[fileField.name];
        
        if (!file.type.startsWith('image/')) {
          updateError('El archivo seleccionado debe ser una imagen.');
          return;
        }
        formData[fileField.name] = file.name
      }
      
      const payload = {
            id_section: section,
            id_campus: user.id_campus,
            data: formData
      }
      await RecordService.create(payload);
      onSuccess();
      onClose();
    } catch (error) {
      updateError(error.message || `Error al realizar la peticion`)
    }
  };

  const renderInput = (name, type) => {
    switch (type) {
      case 'checkbox':
        return (
          <Switch
            checked={formData[name] || false}
            onChange={(checked) => handleSwitchChange(name, checked)}
            className={`${
              formData[name] ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            <span
              className={`${
                formData[name] ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        );
    }
  };

  return (
    <div className="p-6">
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
      <form onSubmit={handleSubmit}>
        {fields.map(({ name, type }) => (
          <div key={name} className="mb-4 flex items-center">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 capitalize mr-4">
              {name}
            </label>
            {renderInput(name, type)}
          </div>
        ))}
        <button
          type="submit"
          className="px-4 py-2 bg-neutro-tertiary text-white rounded-md hover:bg-neutro-primary"
        >
          Agregar Registro
        </button>
      </form>
    </div>
  );
};

export default RenderFieldForm;