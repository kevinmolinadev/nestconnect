import { useContext, useState } from "react";
import { SectionContext } from "../../../context/section";
import { useQuery } from "@tanstack/react-query";
import { SectionService } from "../../../../infraestructure";
import TableItem from "../components/table-item";
import LoadRecords from "../../../components/load-record";
import Modal from "react-modal";
import RenderFieldForm from "../../../components/renderfieldform";
import * as XLSX from 'xlsx';
import ModalWrapper from "../../../components/modal-wrapper";
import ErrorComponent from "../../../components/error";
import EmptyRecords from "../../../components/empty-records";

Modal.setAppElement("#root");
const ListRecord = () => {
    const { section } = useContext(SectionContext);
    const [showModal, setShowModal] = useState(false);
    const { data: fetchData, isLoading, isError, refetch } = useQuery({
        queryKey: ["section", { id: section.id }],
        queryFn: () => SectionService.getRecordsById(section.id),
        enabled: !!section,
        staleTime: 1 * 60 * 1000
    });

    if (isLoading) return <LoadRecords />;

    if (isError) return <ErrorComponent />

    const handleAddClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const isUrlImage = (value) => {
        if (typeof value !== 'string') return false;
        try {
            const url = new URL(value);
            const imageUrlRegex = /\.(jpeg|jpg|gif|png|svg)$/i;
            return imageUrlRegex.test(url.pathname);
        } catch (e) {
            return false;
        }
    };

    const handleExportClick = () => {
        const arrayOfData = records.map(item => item.data);
        const worksheet = XLSX.utils.json_to_sheet(arrayOfData);

        arrayOfData.forEach((row, rowIndex) => {
            Object.entries(row).forEach(([key, value], colIndex) => {
                if (isUrlImage(value)) {
                    const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
                    worksheet[cellAddress].l = { Target: value, Tooltip: key };
                    worksheet[cellAddress].s = { alignment: { wrapText: 1 } };
                }
            });
        });

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Registros');
        XLSX.writeFile(workbook, `${section.name}.xlsx`);
    };

    const customStyles = {
        content: {
            backgroundColor: "white",
            borderRadius: "8px",
            position: "relative",
            inset: "0px",
            width: window.matchMedia("(max-width: 768px)").matches ? "100%" : "400px",
            padding: "1rem",
            outline: "none",
        },
        overlay: {
            backgroundColor: "#0000007f",
            zIndex: 20,
            position: "absolute",
            display: "flex",
            width: "100%",
            height: "100dvh",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
        },
    };

    const records = fetchData.data || [];

    return (
        <div className="flex flex-col gap-4 flex-grow p-4">
            <div className="flex gap-4">
                {/* <input
                    type="text"
                    placeholder="Buscar..."
                    className="px-4 py-2 border border-gray-300 rounded-md w-72"
                /> */}
                <ModalWrapper className="justify-start z-10" title="Crear nuevo registro" message="Introduce la información necesaria para añadir un nuevo registro." >
                    <button onClick={handleAddClick} className="p-2 bg-neutro-tertiary text-white rounded-md hover:bg-neutro-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M3 15h6" /><path d="M6 12v6" /></svg>
                    </button>
                </ModalWrapper>
                <ModalWrapper className="justify-start z-10" title="Exportar a Excel" message="Haz clic para descargar los datos en formato Excel. ¡Es rápido y sencillo!" >
                    <button onClick={handleExportClick} className="p-2 bg-neutro-tertiary text-white rounded-md hover:bg-neutro-primary">
                        <svg className="w-6" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M14 3v4a1 1 0 0 0 1 1h4"></path><path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3"></path></svg>
                    </button>
                </ModalWrapper>
                <Modal
                    isOpen={showModal}
                    onRequestClose={handleCloseModal}
                    contentLabel="Agregar Registro"
                    style={customStyles}
                >
                    <RenderFieldForm fields={section.fields || []} onClose={handleCloseModal} section={{ id: section.id, name: section.name }} onSuccess={() => refetch()} />
                </Modal>
            </div>
            <div className="w-full flex-grow relative overflow-x-auto rounded-md">
                {records.length > 0
                    ? <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                {
                                    section.fields.map(item => {
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
                            {records.map((item, index) => <TableItem onDelete={refetch} onUpdate={refetch} key={index} index={index} item={item} />)}
                        </tbody>
                    </table>
                    : <EmptyRecords message="Esta sección aun no tiene registros disponibles." />
                }
            </div>
        </div>
    );
};
export default ListRecord;