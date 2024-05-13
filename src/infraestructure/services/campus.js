import { HandleRequest } from "../handleRequest"
const CAMPUS = import.meta.env.VITE_API_CAMPUS
export const CampusService = {
    getAll: () => {
        return HandleRequest.get(CAMPUS);
    },
}