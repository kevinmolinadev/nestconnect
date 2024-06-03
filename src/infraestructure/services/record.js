import { json } from "react-router-dom";
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
    delete: async (id,id_section) => {
        await fetch(`${RECORDS}/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({id_section})
            
        });
    }
}