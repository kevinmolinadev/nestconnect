import NotRecords from "../assets/svg/NoDocuments.svg"
const EmptyRecords = ({ message }) => {
    return (
        <div className="flex flex-col justify-center items-center gap-2 flex-grow">
            <img src={NotRecords} className="md:w-96" alt="empty-records" />
            {
                message && <p>{message}</p>
            }
        </div>
    )
}
export default EmptyRecords;