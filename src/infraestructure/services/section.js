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
        return HandleRequest.get(`${SECTIONS}/${id}/records?limit=12`)
    },
    getModerators: (id) => {
        return HandleRequest.get(`${SECTIONS}/${id}/moderators`)
    },
    create: (payload) => {
        return HandleRequest.post(SECTIONS, payload);
    },
    addModerators: (moderators, id) => {
        return HandleRequest.post(`${SECTIONS}/${id}/moderators`, moderators);
    },
    update: (id, payload) => {
        return HandleRequest.put(`${SECTIONS}/${id}`, payload)
    },
    deleteModerators: (moderators, id) => {
        return HandleRequest.put(`${SECTIONS}/${id}/moderators`, moderators);
    },
    delete: (id) => {
        return HandleRequest.delete(`${SECTIONS}/${id}`)
    }
}