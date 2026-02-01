import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/loginCheck");
            set({authUser: res.data.data});
        } catch (err) {
            console.log("Error in authCheck:", err);
            set({authUser: null});
        } finally {
            set({isCheckingAuth: false});
        }
    },
    signup: async (formData) => {
        set({isSigningUp: true})
        try {
            const res = await axiosInstance.post("/auth/signup", formData);
            set({authUser: res.data.data});
            toast.success("Account created successfully");
        } catch (err) {
            toast.error(err.response.data.message);
        } finally {
            set({isSigningUp: false});
        }
    },
    login: async (formData) => {
        set({isLoggingIn: true})
        try {
            const res = await axiosInstance.post("/auth/login", formData);
            set({authUser: res.data.data});
            toast.success("Logged in successfully");
        } catch (err) {
            toast.error(err.response.data.message);
        } finally {
            set({isLoggingIn: false});
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser: null});
            toast.success("Logged out successfully");
        } catch (err) {
            toast.error("Error logging out");
            console.log("Logout error", err);
        }
    },
    updateProfile: async (data, user) => {
        try {
            const res = await axiosInstance.put("/profile/update-profile", data);
            set({authUser: {...user, profilePic: res.data.data.profilePic}});
            toast.success("Updated profile pic successfully");
        } catch (err) {
            console.log("Unable to update profile. Try again", err);
            toast.error(err.response.data.message);
        }
    }
}));