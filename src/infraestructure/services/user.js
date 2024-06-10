import { HandleRequest } from "../handleRequest"
const USERS = import.meta.env.VITE_API_USER
export const UserService = {
    getUsers: (filter) => {
        return HandleRequest.get(`${USERS}/search?value=${filter}&limit=5`);
    },
    update: (payload) => {
        return HandleRequest.put(`${USERS}/profile`, payload);
    },
    getProfile: () => {
        return HandleRequest.get(`${USERS}/profile`);
    }
}