import express from "express";
import {
    forgotPassword,
    login,
    logout,
    register,
    removeProfilePhoto,
    resetPassword,
    updateProfile,
    uploadProfilePhoto
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload, profilePhotoUpload } from "../middlewares/multer.js";

const router = express.Router();

// Auth routes
router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);


// Profile update with both resume and profile photo
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").put(resetPassword);

// Separate routes for profile photo and resume if needed individually
router.route("/upload-profile-photo").put(isAuthenticated, profilePhotoUpload, uploadProfilePhoto);


router.route("/remove-profile-photo").put(isAuthenticated, removeProfilePhoto);

export default router; 
