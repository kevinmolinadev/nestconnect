import { HandleRequest } from "../handleRequest"
const UPLOAD = import.meta.env.VITE_API_UPLOAD
export const UploadService = {
    getURL: async (payload) => {
        return HandleRequest.post(UPLOAD, payload);
    },
    upload: async (url, file) => {
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": file.type
                },
                body: file
            })
            if (!response.ok) throw new Error("Error uploading image.")
            return response.url.split("?")[0];
        } catch (error) {
            console.log(error);
        }
    }
}