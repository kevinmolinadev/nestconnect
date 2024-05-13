import { HandleRequest } from "../handleRequest"
const RECORDS = import.meta.env.VITE_API_RECORD
export const RecordService = {
    getAll: () => {
        return HandleRequest.get(RECORDS);
    },
    getById: (id) => {
        return HandleRequest.get(`${RECORDS}/${id}`)
    },
    create: (payload) => {
        return HandleRequest.post(RECORDS, payload);
    },
    update: (id, payload) => {
        return HandleRequest.put(`${RECORDS}/${id}`, payload)
    },
    delete: (id) => {
        return HandleRequest.delete(`${RECORDS}/${id}`)
    }
}