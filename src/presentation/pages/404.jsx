import { Link } from "react-router-dom"
import IMG from "../assets/home/univalle.jpg"

const NotFound = () => {
    return (
        <section className="h-dvh w-full flex flex-col">
            <div className="h-[60%]">
                <img className="w-full h-full object-cover object-bottom brightness-75" src={IMG} alt="univalle" />
            </div>
            <div className="flex flex-col items-center justify-center flex-grow">
                <h1 className="text-4xl font-bold">No podemos encontrar esta página</h1>
                <p className="mt-6 mb-8 text-lg">Intente buscar de nuevo, o vuelva al inicio para empezar.</p>
                <Link className="px-6 py-3 text-white text-lg bg-neutro-tertiary rounded-md" to="/">Volver al inicio</Link>
            </div>
        </section>
    )
}
export default NotFound;