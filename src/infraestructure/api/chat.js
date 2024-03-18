export const Chat = {
    get: async () => {
        const response = await fetch("http://127.0.0.1:8000")
        return await response.json()
    },
    answerQuestions: async (question) => {
        const response = await fetch("http://127.0.0.1:8000/questions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(question)
        })
        return response.json();
    }
}
