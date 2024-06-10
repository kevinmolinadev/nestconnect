const validateResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) throw new Error(Object.values(data.error)[0]);
    if (response.headers.get("X-User-Type") && response.headers.get("X-User-Email")) {
        return { data, type: response.headers.get("X-User-Type"), validatedEmail: "true" === response.headers.get("X-User-Email") }
    }
    return data;

}

export const HandleRequest = {
    async get(url) {
        const response = await fetch(url, {
            credentials: 'include'
        });
        return validateResponse(response);
    },
    async post(url, payload) {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        return validateResponse(response);
    },
    async put(url, payload) {
        const response = await fetch(url, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        return validateResponse(response);
    },
    async delete(url) {
        await fetch(url, {
            method: 'DELETE',
            credentials: 'include'
        });
    }
};
