import express from "express";
import { addFood, listfood, removefood } from "../controllers/foodcontrollers.js";
import multer from "multer";

const foodRouter = express.Router();

// Configure Multer storage to use the /tmp directory on Vercel
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/tmp'); // Temporary storage for Vercel
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    }
});

// Multer configuration with file size limit and file type filter
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed'), false);
        }
        cb(null, true);
    }
});

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listfood);
foodRouter.post("/remove", removefood);

export default foodRouter;
