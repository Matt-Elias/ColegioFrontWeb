import axios from "axios";

const CLOUDINARY_API_URL = "http://localhost:8080/cloudinary/imagen";
const getToken = () => localStorage.getItem("token");

export const subirImagenCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axios.post(`${CLOUDINARY_API_URL}/subir`, formData, {
            headers: {Authorization: `Bearer ${getToken()}`, "Content-Type": "multipart/form-data" }
        });

        return response.data.result.secure_url;
    } catch (error) {
        console.error("Error al subir imagen a Cloudinary", error);
        throw error;
    }
}

export const eliminarImagenCloudinary = async () => {
    try {
        const response = await axios.delete(`${CLOUDINARY_API_URL}/eliminar/${publicId}`, {
            headers: { Authorization: `Bearer ${getToken()}`}
        });

        return response.data;
    } catch (error) {
        console.error("Error al eliminar imagen de Cloudinary", error);
        throw error;
    }
}

