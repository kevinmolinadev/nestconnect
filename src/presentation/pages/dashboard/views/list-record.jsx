import { useContext } from "react";
import { SectionContext } from "../../../context/section";
import { useQuery } from "@tanstack/react-query";
import { SectionService } from "../../../../infraestructure";
import TableItem from "../../../components/table-item";
import Empty from "../../../assets/no-task.png"
import { FilePlus2 } from "lucide-react";
import LoadRecords from "../../../components/load-record";

const ListRecord = () => {
    const { section } = useContext(SectionContext);

    const { data: fetchData, isLoading, error } = useQuery({
        queryKey: ["section", { id: section.id }],
        queryFn: () => SectionService.getRecordsById(section.id),
        enabled: !!section,
    });


    if (isLoading || error) return <LoadRecords />;

    const records = fetchData.data || [];


    return (
        <div className="flex flex-col gap-4 flex-grow p-4">
            <div className="flex gap-4">
                <button className="px-3 bg-neutro-tertiary text-white rounded-md hover:bg-neutro-primary">
                    <FilePlus2 size={24} />
                </button>
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="px-4 py-2 border border-gray-300 rounded-md w-72"
                />
            </div>
            {records.length > 0 ? <table className="rounded-md overflow-hidden section-list w-full">
                <thead className="text-white bg-neutro-tertiary">
                    <tr>
                        <th>#</th>
                        {
                            section.fields.map(item => {
                                if (item.type.startsWith("date") || item.type === "time") return;
                                return <th key={item._id}>{item.name}</th>
                            })
                        }
                        <th>Fecha de creación</th>
                        {records[0].updated_at && <th>Última modificación</th>}
                        {records[0].updated_by && <th>Modificado por</th>}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((item, index) => <TableItem key={index} index={index} item={item} />)}
                </tbody>
            </table> :
                <div className="flex flex-col gap-4 justify-center items-center flex-grow">
                    <img className="w-1/5" src={Empty} alt="empty" />
                    <h2 className="text-xl">No hay registros disponibles en esta sección</h2>
                </div>
            }
        </div>
    );
};
export default ListRecord;
