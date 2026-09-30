import api from "./api";

export async function createAdoptionRequest(adoptionData) {
    const response = await api.post("/adoption-form",adoptionData);
    return response.data;
}

export async function getMyAdoptionRequests(){
    const response = await api.get(`/adoption-requests`);
    return response.data;
}

export async function deletePendingRequest(id){
    const response = await api.delete(`/adoption-requests/${id}`)
    return response.data;
}

export async function getReceivedAdoptionRequests() {
    const response = await api.get("/adoption-requests/received");
    return response.data;
}

export async function approveAdoptionRequest(id) {
    const response = await api.patch(`/adoption-requests/${id}/approve`);
    return response.data;
}

export async function declineAdoptionRequest(id) {
    const response = await api.patch(`/adoption-requests/${id}/decline`);
    return response.data;
}