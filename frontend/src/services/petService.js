import api from "./api";

//ADD
export async function addPet(formData){
    const response = await api.post("/addPet",formData);
    return response.data;
}

// detials
export async function getPet(id) {
  const response = await api.get(`/pet/${id}`);
  return response.data;
}

// All pets
export async function getallPet() {
  const response = await api.get(`/pets/`)
  return response.data;
}

// Update
export async function updatePet(id, formData) {
    const response = await api.put(`/pet/${id}`,formData);
    return response.data;
}

// delete
export async function deletePet(id) {
    const response = await api.delete(`/pet/${id}`);
    return response.data;
}