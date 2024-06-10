import { Link } from "react-router-dom";
import Pillar from "../../../components/pillar";
import IMGHome from "../../../assets/home/univalle.jpg";
import Excellence from '../../../assets/home/academic-excellence.png';
import Practice from '../../../assets/home/practice.png';
import Research from '../../../assets/home/research.png';
import Exchange from '../../../assets/home/exchange.png';

const Body = () => {
    return (
        <>
            <section className="flex relative h-[72vh] lg:h-[91vh] items-center">
                <div className="absolute h-full w-full">
                    <img className="object-cover h-full w-full brightness-50 object-right" src={IMGHome} alt="home" />
                </div>
                <article className="flex flex-col gap-6 lg:gap-10 text-white z-10 p-4 mx-auto md:w-11/12 lg:p-3.5 lg:w-9/12">
                    <h1 className="text-3xl lg:text-5xl font-bold">¡Descubre AVU!</h1>
                    <p className="text-lg lg:text-xl lg:w-1/2">
                        AVU es tu guía en el mundo universitario, proporcionando respuestas rápidas
                        y personalizadas a preguntas comunes y sobre carreras. Diseñado tanto para
                        visitantes como para estudiantes, nuestro chat te ofrece asistencia
                        experta para que puedas tomar decisiones informadas sobre tu futuro académico.
                    </p>
                    <Link to={"/chat"} className="flex max-sm:border bg-neutro-tertiary px-4 text-lg rounded-md py-2 gap-4 items-center self-center  border lg:border-neutro-tertiary lg:self-start lg:hover:border-white transition-colors duration-500">
                        Chat Univalle
                        <svg className="w-7" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M448 312.43c.77-1.11 1.51-2.26 2.27-3.34A174.55 174.55 0 0 0 480 211.85C480.32 112.55 396.54 32 292.94 32c-90.36 0-165.74 61.49-183.4 143.12a172.81 172.81 0 0 0-4 36.83c0 99.4 80.56 182.11 184.16 182.11 16.47 0 38.66-4.95 50.83-8.29s24.23-7.75 27.35-8.94 8-2.41 11.89-1.29l77.42 22.38a4 4 0 0 0 5-4.86l-17.72-67.49c-1.23-5-1.39-5.94 3.53-13.14z"></path><path d="M312.54 415.38a165.32 165.32 0 0 1-23.26 2.05c-42.43 0-82.5-11.2-115-32.2a184.09 184.09 0 0 1-53.09-49.32c-26.08-34.57-40.3-78.51-40.3-124.49 0-3.13.11-6.14.22-9.16a4.34 4.34 0 0 0-7.54-3.12 158.76 158.76 0 0 0-14.86 195.24c2.47 3.77 3.87 6.68 3.44 8.62l-14.09 72.26a4 4 0 0 0 5.22 4.53l68-24.24a16.85 16.85 0 0 1 12.92.22c20.35 8 42.86 12.92 65.37 12.92a169.45 169.45 0 0 0 116.63-46 4.29 4.29 0 0 0-3.66-7.31z"></path></svg>
                    </Link>
                </article>
            </section>
            <section className="px-4 gap-4 lg:p-3.5 lg:w-9/12 mx-auto  my-8">
                <h2 className="text-3xl lg:text-4xl text-croma-secondary font-bold text-center">Descubre nuestros pilares fundamentales</h2>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    <Pillar
                        title="Excelencia Académica"
                        img={Excellence}
                        subtitle="Excelencia académica que cumple con estándares internacionales"
                        content="Única Universidad en Bolivia que ha rediseñado sus 32 carreras. 
                        Mejorando y actualizando los planes de estudio y programas analíticos. 
                        Es la universidad privada con más acreditaciones al MERCOSUR en Bolivia."
                    />
                    <Pillar
                        title="Práctica"
                        img={Practice}
                        subtitle="Creamos excelencia con práctica"
                        content="Nuestra universidad destaca por su enfoque práctico, donde la investigación se traduce en soluciones tangibles para la sociedad y el sector productivo. Con nuestros centros de investigación líderes en tecnología, contribuimos al desarrollo científico del país."
                    />

                    <Pillar
                        title="Investigación"
                        img={Exchange}
                        subtitle="Investiga y expande tu conocimiento"
                        content="La Universidad del Valle ha desarrollado laboratorios, centros de práctica y experimentación, donde los estudiantes son los protagonistas porque se convierten en investigadores, con el objetivo de que la investigación y la creación sean parte de su vida académica y profesional."
                    />
                    <Pillar
                        title="Intercambios"
                        img={Research}
                        subtitle="Intercambios que te inspiran a crecer"
                        content="La Universidad con mayor número de programas de intercambio estudiantil vigentes y operativos: Más de 450 estudiantes han participado en los últimos cinco años. Posibilidad de intercambio con más de 300 universidades en todo el mundo."
                    />
                </div>
            </section>
        </>
    )
}
export default Body;