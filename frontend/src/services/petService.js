const API_URL = "http://127.0.0.1:8000/api";


//ADD
export async function addPet(formData, token) {
    const response = await fetch(`${API_URL}/addPet`,{
            method: "POST",

            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },

            body: formData,
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
}


// detials
export async function getPet(id) {
  const response = await fetch(`${API_URL}/pet/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch pets");
  }

  return response.json();
}


// All pets
export async function getallPet() {
  const response = await fetch(`${API_URL}/pets/`);

  if (!response.ok) {
    throw new Error("Failed to fetch pets");
  }

  return response.json();
}

export async function updatePet(id, formData) {
    const response = await fetch(`${API_URL}/pet/${id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },

            body: JSON.stringify(formData),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update pet");
    }

    return response.json();
}

export async function deletePet(id) {
    const response = await fetch(`${API_URL}/pet/${id}`, {
        method: "DELETE",

        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete pet");
    }

    return response.json();
}