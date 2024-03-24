import React from 'react';
import Header from './Header';

const faqs = [
  {
    question: '¿Cómo puedo inscribirme en los cursos?',
    answer: 'Puedes inscribirte en los cursos accediendo al portal de estudiantes y seleccionando los cursos que deseas cursar para el próximo semestre.'
  },
  {
    question: '¿Qué opciones de financiamiento están disponibles?',
    answer: 'Ofrecemos diversas opciones de financiamiento, incluyendo becas, ayudas económicas y planes de pago. Visita la sección de financiamiento en nuestra web para más detalles.'
  },
  {
    question: '¿Cómo puedo cambiar mi carrera o plan de estudios?',
    answer: 'Para cambiar tu carrera o plan de estudios, debes solicitar una cita con tu asesor académico y discutir tus opciones basadas en tus intereses y rendimiento académico.'
  },
  // Más preguntas y respuestas...
];

function FaqScreen() {
  return (
    <div className="bg-[#F4EFF3] min-h-screen">
      <Header pageTitle="PREGUNTAS FRECUENTES" />
      <div className="container mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Preguntas Frecuentes</h2>
          <ul className="space-y-4">
            {faqs.map((faq, index) => (
              <li key={index} className="border-b-2 pb-4">
                <h3 className="text-xl font-semibold">{faq.question}</h3>
                <p>{faq.answer}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FaqScreen;
