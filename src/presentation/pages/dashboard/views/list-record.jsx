import { useContext, useState } from "react";
import { SectionContext } from "../../../context/section";
import { useQuery } from "@tanstack/react-query";
import { SectionService } from "../../../../infraestructure";
import TableItem from "../components/table-item";
import Empty from "../../../assets/no-task.png"
import { FilePlus2 } from "lucide-react";
import LoadRecords from "../../../components/load-record";
import Modal from "react-modal";
import RenderFieldForm from "../../../components/renderfieldform";
import * as XLSX from 'xlsx';
import { TbFileExport } from "react-icons/tb";
import ModalWrapper from "../../../components/modal-wrapper";

Modal.setAppElement("#root");
const ListRecord = () => {
    const { section } = useContext(SectionContext);

    const [showModal, setShowModal] = useState(false);


    const { data: fetchData, isLoading, error, refetch } = useQuery({

        queryKey: ["section", { id: section.id }],
        queryFn: () => SectionService.getRecordsById(section.id),
        enabled: !!section,
    });

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
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "20px",
            outline: "none",
        },
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
    };

    if (isLoading || error) return <LoadRecords />;

    const records = fetchData.data || [];

    return (
        <div className="flex flex-col gap-4 flex-grow p-4">
            <div className="flex gap-4">
                <ModalWrapper className="justify-start" title="Crear un nuevo registro" message="Inserta los datos que quieres que tenga tu registro" >
                    <button onClick={handleAddClick} className="px-3 bg-neutro-tertiary text-white rounded-md hover:bg-neutro-primary">
                        <FilePlus2 size={24} />
                    </button>
                </ModalWrapper>
                <ModalWrapper className="justify-start" title="Exportar a Excel" message="Exporta todos los campos existentes de la seccion a un archivo Excel" >
                    <button onClick={handleExportClick} className="px-3 bg-neutro-tertiary text-white rounded-md hover:bg-neutro-primary">
                        <TbFileExport size={24} />
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
                    {records.map((item, index) => <TableItem onDelete={refetch} onUpdate={refetch} key={index} index={index} item={item} />)}
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