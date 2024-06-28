import NotRecords from "../assets/svg/NoDocuments.svg"
const EmptyRecords = ({ message }) => {
    return (
        <div className="flex flex-col justify-center items-center gap-2 w-full h-full flex-grow">
            <img src={NotRecords} className="md:w-96" alt="empty-records" />
            {
                message && <p className="text-center">{message}</p>
            }
        </div>
    )
}
export default EmptyRecords;