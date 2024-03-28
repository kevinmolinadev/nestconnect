export const Chat = {
    get: async () => {
        const response = await fetch("https://avu-p472pmh57q-rj.a.run.app")
        return await response.json()
    },
    answerQuestions: async (question) => {
        const response = await fetch("https://avu-p472pmh57q-rj.a.run.app/questions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(question)
        })
        return response.json();
    }
}
