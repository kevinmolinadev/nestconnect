import Error from "../assets/svg/Error.svg"
const ErrorComponent = () => {
    return (
        <div className="flex flex-col w-full h-full justify-center items-center gap-2">
            <img src={Error} className="md:w-96" alt="error" />
            <p>Lo sentimos, no pudimos obtener el recurso. Por favor, inténtalo de nuevo más tarde.</p>
        </div>
    )
}
export default ErrorComponent;