import api from "./api";

export async function getProfile() {
    const response = await api.get("/profile");
    return response.data;
}

export async function updateProfile(profileData) {
    const response = await api.put("/profile", profileData);
    return response.data;
}

export async function changePassword(passwordData) {
    const response = await api.put("/profile/password", passwordData);
    return response.data;
}

export async function deleteAccount() {
    const response = await api.delete("/profile");
    return response.data;
}