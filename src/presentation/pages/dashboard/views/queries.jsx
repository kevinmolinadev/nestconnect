import { useQuery } from "@tanstack/react-query";
import { QueryService } from "../../../../infraestructure";
import LoadRecords from "../../../components/load-record";
import ErrorComponent from "../../../components/error";
import EmptyRecords from "../../../components/empty-records";
import * as XLSX from 'xlsx';
import ModalWrapper from "../../../components/modal-wrapper";
import { Time } from "../../../../helpers/time";


const Queries = () => {
    const { isLoading, data: fetch, isError } = useQuery({
        queryKey: ["queries"],
        queryFn: QueryService.getAll
    })

    if (isLoading) return <LoadRecords />
    if (isError) return <ErrorComponent />
    if (fetch.data.length < 1) return <EmptyRecords message="No se encontraron consultas" />

    const properties = Object.keys(fetch.data[0].data);

    const handleExportClick = () => {
        const arrayOfData = fetch.data.map(item => item.data);
        const worksheet = XLSX.utils.json_to_sheet(arrayOfData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Consultas');
        XLSX.writeFile(workbook, `consultas.xlsx`);
    };

    return (
        <div className="p-4 w-full">
            <ModalWrapper className="justify-start z-10" title="Exportar a Excel" message="Haz clic para descargar los datos en formato Excel. ¡Es rápido y sencillo!" >
                <button onClick={handleExportClick} className="p-2 bg-neutro-tertiary text-white rounded-md hover:bg-neutro-primary">
                    <svg className="w-6" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M14 3v4a1 1 0 0 0 1 1h4"></path><path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3"></path></svg>
                </button>
            </ModalWrapper>
            <div className="w-full overflow-x-scroll relative h-full mt-4 rounded-md">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            {
                                properties.map((k, index) => <th key={index}>{k}</th>)
                            }
                            <th>Fecha de creación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetch.data.map((item, index) => <tr key={index}>
                            <td>{index + 1}</td>
                            {
                                properties.map(key => <td key={key}>{item.data[key]||"--"}</td>)
                            }
                            <td>{Time.getDateString(item.created_at)}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Queries;