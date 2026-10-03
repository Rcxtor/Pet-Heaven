
// const API_URL = "http://127.0.0.1:8000/api";

// export async function registerUser(userData) {
//     const response = await fetch(`${API_URL}/register`, {
//         method: "POST",

//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json",
//         },

//         body: JSON.stringify(userData),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//         throw data;
//     }

//     return data;
// }

// export async function loginUser(userData) {
//     const response = await fetch(`${API_URL}/login`, {
//         method: "POST",

//         headers: {
//             "Content-Type": "application/json",
//         },

//         body: JSON.stringify(userData),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//         throw data;
//     }

//     return data;
// }


// export async function getCurrentUser(token) {
//     const response = await fetch(`${API_URL}/user`, {
//         headers: {
//             "Authorization": `Bearer ${token}`,
//             "Accept": "application/json",
//         },
//     });

//     const data = await response.json();

//     if (!response.ok) {
//         throw data;
//     }

//     return data;
// }


// export async function logoutUser(token) {
//     const response = await fetch(`${API_URL}/logout`, {
//         method: "POST",

//         headers: {
//             "Authorization": `Bearer ${token}`,
//             "Accept": "application/json",
//         },
//     });

//     const data = await response.json();

//     if (!response.ok) {
//         throw data;
//     }

//     return data;
// }

import api from "./api";

export async function registerUser(userData) {
    const response = await api.post("/register", userData);
    return response.data;
}

export async function loginUser(credentials) {
    const response = await api.post("/login", credentials);
    return response.data;
}

export async function logoutUser() {
    const response = await api.post("/logout");
    return response.data;
}

export async function getCurrentUser() {
    const response = await api.get("/user");
    return response.data;
}

export async function forgotPassword(email) {
    const response = await api.post("/forgot-password", {
        email,
    });
    return response.data;
}

export async function resetPassword(resetData) {
    const response = await api.post("/reset-password", resetData);
    return response.data;
}