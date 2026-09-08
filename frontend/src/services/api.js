const API_URL = "http://127.0.0.1:8000/api";

export async function getPets() {
    const response = await fetch(`${API_URL}/pets`);

    if (!response.ok) {
        throw new Error("Failed to fetch pets");
    }

    return response.json();
}

