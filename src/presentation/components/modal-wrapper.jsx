const ModalWrapper = ({ children, message, title, className }) => {
    return (
        <div className={`wrapper  ${className}`}>
            {children}
            <article className={`absolute w-72 top-full mt-2 rounded-md border-2 p-3 bg-white`} >
                <h2 className="mb-1.5 font-bold">{title}</h2>
                <p className="text-sm">{message}</p>
            </article>
        </div>
    )
}
export default ModalWrapper;