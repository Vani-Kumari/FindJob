import multer from "multer";
import path from "path";

// Memory Storage for Cloudinary uploads
const storage = multer.memoryStorage();

// File Filter (Optional but recommended)
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'application/pdf'
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, JPEG, JPG, and PNG files are allowed.'), false);
    }
};

// Multer Instance
export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 5MB limit
    }
});

// For single field uploads (can handle multiple fields)
export const singleUpload = upload.fields([
    { name: "file", maxCount: 1 },           // for resume
    { name: "profilePhoto", maxCount: 1 }    // for profile photo
]);

export const profilePhotoUpload = upload.single("profilePhoto");

export const resumeUpload = upload.single("file");
