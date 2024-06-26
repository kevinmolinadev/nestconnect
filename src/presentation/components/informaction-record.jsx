import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { RecordService } from "../../infraestructure";
import { Time } from "../../helpers/time"
import LoadRecords from "./load-record";

const InformationRecord = () => {
    const item = sessionStorage.getItem("record");
    const { id } = useParams();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["record"],
        queryFn: () => RecordService.getById(id),
        enabled: !item
    })
    if (isLoading) return <LoadRecords />
    if (isError) return <Navigate to={"*"} />

    const record = !item ? data : JSON.parse(item);

    const formatValue = (value) => {
        if (value === "--") return null;
        if (typeof value === 'boolean') return value ? { value: "Sí" } : { value: "No" };
        if (typeof value === 'number') return { value: value.toString() };
        if (/^(https:\/\/(docs\.google\.com\/forms\/d\/e\/|forms\.(office|microsoft)\.com\/).*)$/.test(value)) return { value, isUrl: true };
        if (value.startsWith("https://")) return {
            value: (
                <a href={value} target="_blank" className="bg-neutro-tertiary/20 rounded-md px-2 py-1 text-center flex gap-2 justify-center text-white">
                    ver <svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" /><path d="m21 3-9 9" /><path d="M15 3h6v6" /></svg>
                </a>
            )
        }
        if (/^(\d{4})-(\d{2})-(\d{2})(T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-](\d{2}):(\d{2})))?)?$/.test(value)) return { value: Time.getDateString(value) }
        return { value };
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
    }

    return (
        <div className="flex-grow flex items-center justify-center">
            <div className="flex justify-center flex-wrap p-4 md:w-11/12 lg:w-9/12">
                {
                    Object.values(record.data).filter(isUrlImage).map((imgUrl, index) => (
                        <div key={index} className="max-xl:w-full md:h-[60vh] lg:h-[55vh]">
                            <img src={imgUrl} alt="img" className="w-full h-full object-center rounded-md object-fill  xl:object-cover" />
                        </div>
                    ))
                }
                <div className="py-4 flex flex-col items-start justify-between gap-4 h-full max-xl:mr-auto xl:px-4">
                    {
                        Object.entries(record.data).filter(([, value]) => !(isUrlImage(value))).map(([key, value], index) => {
                            const valueFormatted = formatValue(value);
                            return valueFormatted && (
                                valueFormatted?.isUrl
                                    ? (<div key={index} >
                                        <a className="rounded-md p-2 px-4 inline-block bg-neutro-tertiary text-white" href={valueFormatted.value} target="_blank">Incribirse</a>
                                    </div>)
                                    : (<div key={index}>
                                        <h3 className="text-sm font-bold text-gray-800">{key}</h3>
                                        <p className="text-sm text-gray-600">{valueFormatted.value}</p>
                                    </div>)
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default InformationRecord;