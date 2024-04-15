import React, { useState } from 'react';

function Assistant({ onFormSubmitted }) {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) {
      tempErrors.name = "El nombre es obligatorio";
    }
    if (!formData.phone) {
      tempErrors.phone = "El teléfono es obligatorio";
    } else if (!/^\d{8}$/.test(formData.phone)) {
      tempErrors.phone = "El teléfono debe tener 8 dígitos";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const response = await fetch("http://localhost:3000/api/v1/section-type/send-chat", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ user: formData, chat: JSON.parse(sessionStorage.getItem("chat")) })
      });
      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          onFormSubmitted();
        }, 3000);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center">
          <h2 className="text-gray-700 text-xl mb-4">Gracias por enviar tu formulario</h2>
          <p>Un asesor se contactará contigo.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-2xl" style={{ maxWidth: '400px' }}>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-gray-700 text-3xl text-center mb-6">Contactar con Asesor</h2>
          <p className="text-gray-700 mb-4 text-sm text-center">Completa el formulario para ponerte en contacto con un asesor.</p>
          
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="text-gray-700 mb-2">Nombre</label>
            <input
              type="text"
              name="name"
              className="p-3 rounded bg-gray-100 w-full"
              placeholder="Introduce tu nombre"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="text-red-500 mt-2">{errors.name}</p>}
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="phone" className="text-gray-700 mb-2">Teléfono</label>
            <input
              type="text"
              name="phone"
              className="p-3 rounded bg-gray-100 w-full"
              placeholder="Introduce tu teléfono"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <p className="text-red-500 mt-2">{errors.phone}</p>}
          </div>

          <div className="flex flex-col">
            <button type="submit" className="bg-neutro-tertiary w-full p-3 rounded-md hover:bg-[#A7A9AC] text-white transition duration-300 mt-4">Contactar Asesor</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Assistant;
