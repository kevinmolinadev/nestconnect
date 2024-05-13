import { HandleRequest } from "../handleRequest";
const API_CHAT = import.meta.env.VITE_API_CHAT
export const ChatService = {
    answerQuestion: (question) => {
        return HandleRequest.post(API_CHAT, question);
    }
}