import { axiosInstance } from "../lib/axios";
import { AuthResponse } from "../types/auth.types";


export const authService = {
    signup : async( username: string, email:string, password: string): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>('/user/signup',{username,email,password});
        return response.data; 
    },

    signin : async( email: string, password: string): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>('/user/signin',{email,password} );
        return response.data;
    },     
}