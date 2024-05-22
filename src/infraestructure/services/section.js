import { HandleRequest } from "../handleRequest"
const SECTIONS = import.meta.env.VITE_API_SECTION
export const SectionService = {
    getAll: () => {
        return HandleRequest.get(SECTIONS);
    },
    getTypes: () => {
        return HandleRequest.get(`${SECTIONS}/types`);
    },
    getById: (id) => {
        return HandleRequest.get(`${SECTIONS}/${id}`)
    },
    getRecordsById: (id) => {
        return HandleRequest.get(`${SECTIONS}/${id}/records`)
    },
    create: (payload) => {
        return HandleRequest.post(SECTIONS, payload);
    },
    update: (id, payload) => {
        return HandleRequest.put(`${SECTIONS}/${id}`, payload)
    },
    delete: (id) => {
        return HandleRequest.delete(`${SECTIONS}/${id}`)
    }
}