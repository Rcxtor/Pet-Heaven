const API_URL = "http://127.0.0.1:8000";

export function getImageUrl(image) {
    if (!image) {
        return null;
    }

    // Already a complete URL
    if (image.startsWith("http://") || image.startsWith("https://")) {
        return image;
    }

    // Backend returns /storage/...
    if (image.startsWith("/")) {
        return `${API_URL}${image}`;
    }

    return `${API_URL}/${image}`;
}