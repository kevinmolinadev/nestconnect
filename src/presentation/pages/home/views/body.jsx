import { Link } from "react-router-dom";
import { IoChatbubblesSharp } from "react-icons/io5";
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
                        <IoChatbubblesSharp className="inline text-2xl" />
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