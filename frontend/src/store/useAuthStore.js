import {create} from 'zustand';
import { axiosInstance } from '../lib/axios.js';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSignUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check")
            
            set ({authuser:res.data})
        } catch (error) {
            console.log("error in checkAuth:", error)
            set({authUser:null})
        } finally {
            set({isCheckingAuth:false});
        }
    }
}))