
const API_URL = "http://127.0.0.1:8000/api";

export async function registerUser(userData) {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
    }

    return response.json();
}

export async function loginUser(userData) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
}


export async function getCurrentUser(token) {
    const response = await fetch(`${API_URL}/user`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
}


export async function logoutUser(token) {
    const response = await fetch(`${API_URL}/logout`, {
        method: "POST",

        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
}