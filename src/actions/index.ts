import axios from 'axios';
import { LoginResponse, UserProps } from '../types/response';

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try{
        const response = await axios.post<LoginResponse>(`http://localhost:3000/api/auth/login`, { email, password })
        console.log(response);
        localStorage.setItem('logged', 'true');
        return response.data;
    }catch(error){
        console.error(error);
        throw error;
    }
}

export const get_user_role = async (token: string) => {
    try{
        const response = await axios.get(`http://localhost:3000/api/users/role`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data.role;
    }catch(error){  
        console.error("Error al obtener el rol del usuario", error);
        throw error;
    }
}

export const forgot_password = async (email: string) => {
    try{
        const response = await axios.post(`http://localhost:3000/api/auth/forgot-password`, {email})
        return response.data;
    }catch(error){
        console.error("No se pudo recuperar la contraseña", error);
        throw error;
    }
}

export const reset_password = async (password: string, token: string) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }
    
    const body = JSON.stringify({password})

    try{
        const response = await axios.post(`http://localhost:3000/api/auth/reset-password/${token}`, body, config);
        return response.data;

    }catch(error){
        console.error("Hubo un error al cambiar la contraseña", error)
        throw error;
    }
}


export const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try{

        const token = localStorage.getItem('accessToken');
        console.log("Token enviado:", token);

        const response = await axios.post(`http://localhost:3000/api/image/upload-image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data
    }catch(error){
        console.error("No se logró subir la imagen", error);
        throw error;
    }
}

export const getImages = async () => {
    try {

        const response = await axios.get(`http://localhost:3000/api/image/get-images`)
        return response.data;
    }catch(error){
 
        console.error("Error al obtener las imágenes", error);
        throw error;
    }
}

export const deleteImage = async (id: number) => {
    try {
        const response = await axios.delete(`http://localhost:3000/api/image/delete-image/${id}`)          
        return response.data;
    } catch (error) {
        console.error("Error al borrar la imagen", error);
        throw error;
    }
};