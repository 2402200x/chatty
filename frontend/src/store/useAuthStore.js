import {create} from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

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
    },

    signup: async (data) => {
    set({isSignUp: true});
    try {
       const res= await axiosInstance.post('/auth/signup', data);
       set ({authUser: res.data});
       toast.success("Account created successfully!");
    } catch (error) {
        toast.error(error.response.data.message);
    } finally {
        set ({isSignUp: false});
    }
    },

    logout: async () => {
        try {
            set({authUser: null});
            toast.success("Logged out successfully");
        } catch (error) {
           toast.error(error.response.data.message); 
        }
        
    }
}))