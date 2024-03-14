import Home from "./assets/home.jpg";
function App() {
  return (
    <>
      <div className="h-screen flex flex-col">
        <div className="bg-neutro-tertiary p-8">
          <h1 className="text-4xl text-white">¡Bienvenido a la Universidad Privada del Valle!</h1>
        </div>
        <div className="h-full flex overflow-hidden">
          <div className="w-1/2 flex">
            <img className="h-4/5 m-auto rounded-md" src={Home} alt="home" />
          </div>
          <div className="flex w-1/2 justify-center items-center">
            <article className="text-white text-center bg-neutro-tertiary w-4/5 p-8 rounded-xl">
              <h2 className="text-3xl  mb-4">AVU: Tu Asistente Virtual Univalle</h2>
              <p className="whitespace-pre-wrap">
                AVU está aquí para guiarte a través de tu viaje
                educativo, ofreciéndote soporte instantáneo, respuestas
                personalizadas y acceso sin precedentes a recursos
                académicos.
                <br />
                <br />
                En la intersección de la innovación tecnológica y la excelencia académica, AVU (Asistente Virtual Univalle) emerge como tu compañero inteligente y personalizado, diseñado para enriquecer tu experiencia universitaria. Desarrollado con la última tecnología en inteligencia artificial.
              </p>
              <a className="bg-neutro-primary px-6 rounded-md py-4 mt-12 inline-block" href="">Iniciar chat con A.V.U</a>
            </article>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
