import { HandleRequest } from "../handleRequest"

const API_AUTH = import.meta.env.VITE_API_AUTH;

export const AuthService = {
    visitor: async () => {
        return HandleRequest.get(`${API_AUTH}/visit`);
    },
    logOut: async () => {
        return HandleRequest.get(`${API_AUTH}/logout`);
    },
    validateEmail: async () => {
        return HandleRequest.get(`${API_AUTH}/validate-email`)
    },
    sendVerificationCode: async (payload) => {
        return HandleRequest.post(`${API_AUTH}/send-verification-code`, payload)
    },
    sendResetPasswordCode: async (payload) => {
        return HandleRequest.post(`${API_AUTH}/send-reset-code`, payload)
    },
    logIn: async (payload) => {
        return HandleRequest.post(`${API_AUTH}/login`, payload)
    },
    signUp: async (payload) => {
        return HandleRequest.post(`${API_AUTH}/register`, payload)
    },
    validateCode: async (payload) => {
        return HandleRequest.post(`${API_AUTH}/verify-code`, payload)
    },
    sendNewPassword: async (payload) => {
        return HandleRequest.post(`${API_AUTH}/reset-password`, payload)
    },
}