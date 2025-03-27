import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { sendEmail } from "../utils/senEmail.js";


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
});

// Register Controller
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        // Basic validation
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            });
        }

        // Validate phone number is exactly 10 digits
        if (!/^\d{10}$/.test(phoneNumber)) {
            return res.status(400).json({
                message: "Phone number must be exactly 10 digits.",
                success: false
            });
        }

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exists with this email.',
                success: false,
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user (no profile photo now)
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// Logout Controller
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", success: false });
    }
};

// Update Profile Controller
// Update Profile Controller
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const userId = req.id;

        // Find the user
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Update basic fields
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skills.split(",").map(skill => skill.trim());

        // Handle resume upload
        if (req.files?.file) {
            const fileUri = getDataUri(req.files.file[0]);
            const cloudRes = await cloudinary.uploader.upload(fileUri.content, { resource_type: 'raw' });
            user.profile.resume = cloudRes.secure_url;
            user.profile.resumeOriginalName = req.files.file[0].originalname;
        }

        // Handle profile photo upload
        if (req.files?.profilePhoto) {
            const fileUri = getDataUri(req.files.profilePhoto[0]);
            const cloudRes = await cloudinary.uploader.upload(fileUri.content, { resource_type: 'image' });
            user.profile.profilePhoto = cloudRes.secure_url;
        }

        // Save the updated user
        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully.",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            },
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", success: false });
    }
};


// Upload Profile Photo
export const uploadProfilePhoto = async (req, res) => {
    try {
        const userId = req.id;
        const file = req.file;

        // Validate file upload
        if (!file) {
            return res.status(400).json({
                message: "No file uploaded.",
                success: false,
            });
        }

        // Convert file to Data URI and upload to Cloudinary
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false,
            });
        }

        // Update profile photo
        user.profile.profilePhoto = cloudResponse.secure_url;
        await user.save();

        return res.status(200).json({
            message: "Profile photo updated.",
            profilePhoto: cloudResponse.secure_url,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Error",
            success: false,
        });
    }
};
// Remove Profile Photo
export const removeProfilePhoto = async (req, res) => {
    try {
        const userId = req.id;
        console.log("User ID:", userId); // Log the user ID

        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            console.log("User not found:", userId); // Log if user is not found
            return res.status(404).json({
                message: "User not found.",
                success: false,
            });
        }

        // Remove profile photo
        user.profile.profilePhoto = ""; // or set to a default image URL
        await user.save();

        console.log("Profile photo removed for user:", userId); // Log success
        return res.status(200).json({
            message: "Profile photo removed.",
            success: true,
            user, // Return the updated user object
        });
    } catch (error) {
        console.error("Error in removeProfilePhoto:", error); // Log the error
        return res.status(500).json({
            message: "Server Error",
            success: false,
        });
    }
};



// Forgot Password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User with this email does not exist.", success: false });
        }

        // Generate token
        const token = crypto.randomBytes(32).toString("hex");
        const hash = crypto.createHash("sha256").update(token).digest("hex");

        // Save hash to user document
        user.resetPasswordToken = hash;
        user.resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 1 hour expiry
        await user.save();

        // ✅ Proper reset URL with frontend URL from .env
        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;

        // Send mail with reset link
        await transporter.sendMail({
            from: `"JobFinder" <${process.env.SMTP_USER}>`,
            to: user.email,
            subject: "Reset Your Password",
            html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link will expire in 1 hour.</p>`,
        });

        return res.status(200).json({ message: "Password reset email sent.", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error.", success: false });
    }
};

// Reset Password
export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        // Hash the token to compare
        const hash = crypto.createHash("sha256").update(token).digest("hex");

        // Find user with valid token
        const user = await User.findOne({
            resetPasswordToken: hash,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token.", success: false });
        }

        // Update password
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        // Optional: send confirmation email
        await transporter.sendMail({
            from: `"JobFinder" <${process.env.SMTP_USER}>`,
            to: user.email,
            subject: "Password Changed Successfully",
            html: `<p>Your password has been updated successfully!</p>`,
        });

        res.status(200).json({ message: "Password has been reset.", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error.", success: false });
    }
};
