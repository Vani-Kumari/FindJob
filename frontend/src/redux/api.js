import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";

// Set up base URL
const API = axios.create({
    baseURL: `${USER_API_END_POINT}`,
    withCredentials: true,
});

export default API;

// Global error handler for Axios
API.interceptors.response.use(
    (response) => {
        // Return the response data directly for easier handling
        return response.data;
    },
    (error) => {
        // Handle errors globally
        if (error.response) {
            // Server responded with a status code outside 2xx
            console.error("Server Error:", error.response.data);
            return Promise.reject(error.response.data);
        } else if (error.request) {
            // No response received (network error)
            console.error("Network Error:", error.request);
            return Promise.reject({ message: "Network Error. Please check your connection." });
        } else {
            // Something went wrong in setting up the request
            console.error("Request Error:", error.message);
            return Promise.reject({ message: "Request Error. Please try again." });
        }
    }
);

// API to upload profile photo
export const uploadProfilePhoto = async (formData) => {
    try {
        const response = await API.put("/upload-profile-photo", formData, {
            headers: {
                "Content-Type": "multipart/form-data", // Required for file uploads
            },
        });
        return response; // { message, profilePhoto, success }
    } catch (error) {
        console.error("Upload Profile Photo Error:", error);
        throw error; // Propagate the error to the caller
    }
};

// API to remove profile photo
export const removeProfilePhoto = async () => {
    try {
        const response = await API.put("/remove-profile-photo");
        return response; // { message, success }
    } catch (error) {
        console.error("Remove Profile Photo Error:", error);
        throw error; // Propagate the error to the caller
    }
};

// API to update profile data
export const updateProfileData = async (data) => {
    try {
        const response = await API.put("/update-profile", data); // Fixed endpoint typo
        return response; // { message, user, success }
    } catch (error) {
        console.error("Update Profile Error:", error);
        throw error; // Propagate the error to the caller
    }
};


