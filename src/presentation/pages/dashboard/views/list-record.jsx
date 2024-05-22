import { useContext } from "react";
import { SectionContext } from "../../../context/section";
import { useQuery } from "@tanstack/react-query";
import { SectionService } from "../../../../infraestructure";
import TableItem from "../../../components/table-item";

const ListRecord = () => {
    const { section } = useContext(SectionContext);
    const { data: fetchData, isLoading, error } = useQuery({
        queryKey: ["section", { id: section.id }],
        queryFn: () => SectionService.getRecordsById(section.id),
        enabled: !!section,
    });
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;

    const records = fetchData.data || [];
    if (records.length === 0) {
        return <h2 className="m-auto text-xl">No hay registros disponibles en esta sección ahora.</h2>;
    }

    return (
        <div className="p-4 flex-grow">
            <table className="rounded-md overflow-hidden section-list w-full">
                <thead className="text-white bg-neutro-tertiary">
                    <tr >
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
            </table>
        </div>
    );
};
export default ListRecord;
