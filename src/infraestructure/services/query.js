import { HandleRequest } from "../handleRequest"
const QUERIES = import.meta.env.VITE_API_QUERY
export const QueryService = {
    getAll: () => {
        return HandleRequest.get(QUERIES);
    },
    create: (payload) => {
        return HandleRequest.post(QUERIES, payload);
    },
}