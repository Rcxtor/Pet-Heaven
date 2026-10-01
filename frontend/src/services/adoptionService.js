import api from "./api";

export async function createAdoptionRequest(adoptionData) {
    const response = await api.post("/adoption-form",adoptionData);
    return response.data;
}

export async function getMyAdoptionRequests(){
    const response = await api.get(`/adoption-requests`);
    return response.data;
}

export async function cancelAdoptionRequest(id) {
    const response = await api.patch(`/adoption-requests/${id}/cancel`);
    return response.data;
}

export async function getReceivedAdoptionRequests() {
    const response = await api.get("/adoption-requests/received");
    return response.data;
}

export async function selectAdoptionRequest(id) {
    const response = await api.patch(`/adoption-requests/${id}/select`);
    return response.data;
}

export async function cancelAdoptionSelection(id) {
    const response = await api.patch(`/adoption-requests/${id}/cancel-selection`);
    return response.data;
}

export async function completeAdoption(id) {
    const response = await api.patch(`/adoption-requests/${id}/complete`);
    return response.data;
}

export async function declineAdoptionRequest(id) {
    const response = await api.patch(`/adoption-requests/${id}/decline`);
    return response.data;
}
export async function getReceivedAdoptionRequest(id) {

    const response = await api.get(`/adoption-requests/received/${id}`);
    return response.data;
}

export async function checkAdoptionProfile() {
    const response = await api.get("/adoption-requests/check-profile");
    return response.data;
}