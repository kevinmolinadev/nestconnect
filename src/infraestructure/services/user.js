import { HandleRequest } from "../handleRequest"
const USERS = import.meta.env.VITE_API_USER
export const UserService = {
    getUsers: (filter) => {
        return HandleRequest.get(`${USERS}/?name=${filter}`);
    },
    update: (payload) => {
        return HandleRequest.put(`${USERS}/profile`, payload);
    },
}